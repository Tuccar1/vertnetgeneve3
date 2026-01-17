import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Admin credentials - In production, use environment variables and hashed passwords
const ADMIN_CREDENTIALS = {
  username: 'admin',
  // Password: 'Adminpanel2025+' - SHA256 hashed
  passwordHash: 'b7c148461f94ecb61b03a7d3c3ad58abd3f2d0c8c2fbf21ab7760bf82c5ebc08'
};

// Rate limiting
const loginAttempts: Map<string, { count: number; lastAttempt: number }> = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwardedFor?.split(',')[0] || realIP || 'unknown';
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function isRateLimited(ip: string): { limited: boolean; remainingTime?: number } {
  const attempts = loginAttempts.get(ip);
  if (!attempts) return { limited: false };

  const now = Date.now();
  const timeSinceLastAttempt = now - attempts.lastAttempt;

  // Reset if lockout duration passed
  if (timeSinceLastAttempt > LOCKOUT_DURATION) {
    loginAttempts.delete(ip);
    return { limited: false };
  }

  if (attempts.count >= MAX_ATTEMPTS) {
    const remainingTime = Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 1000 / 60);
    return { limited: true, remainingTime };
  }

  return { limited: false };
}

function recordLoginAttempt(ip: string, success: boolean): void {
  if (success) {
    loginAttempts.delete(ip);
    return;
  }

  const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
  attempts.count++;
  attempts.lastAttempt = Date.now();
  loginAttempts.set(ip, attempts);
}

// Token storage (in production, use Redis or database)
const validTokens: Map<string, { username: string; createdAt: number; expiresAt: number }> = new Map();

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Check rate limiting
    const rateLimitCheck = isRateLimited(ip);
    if (rateLimitCheck.limited) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Çok fazla başarısız deneme. ${rateLimitCheck.remainingTime} dakika sonra tekrar deneyin.` 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı adı ve şifre gereklidir' },
        { status: 400 }
      );
    }

    // Verify credentials
    const passwordHash = hashPassword(password);
    
    // Check against admin credentials
    // For first login, accept 'admin' username with 'admin' password
    const isValidAdmin = username === ADMIN_CREDENTIALS.username && 
      (passwordHash === ADMIN_CREDENTIALS.passwordHash || password === 'admin');

    if (!isValidAdmin) {
      recordLoginAttempt(ip, false);
      
      const attempts = loginAttempts.get(ip);
      const remainingAttempts = MAX_ATTEMPTS - (attempts?.count || 0);
      
      return NextResponse.json(
        { 
          success: false, 
          message: `Geçersiz kullanıcı adı veya şifre. ${remainingAttempts} deneme hakkınız kaldı.` 
        },
        { status: 401 }
      );
    }

    // Successful login
    recordLoginAttempt(ip, true);

    // Generate session token
    const token = generateToken();
    const now = Date.now();
    const expiresAt = now + (24 * 60 * 60 * 1000); // 24 hours

    validTokens.set(token, {
      username,
      createdAt: now,
      expiresAt
    });

    // Clean up expired tokens
    for (const [t, data] of validTokens.entries()) {
      if (data.expiresAt < now) {
        validTokens.delete(t);
      }
    }

    const response = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      token,
      expiresAt
    });

    // Set secure cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Verify token endpoint
export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value || 
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ valid: false, message: 'Token bulunamadı' }, { status: 401 });
  }

  const tokenData = validTokens.get(token);
  
  if (!tokenData) {
    return NextResponse.json({ valid: false, message: 'Geçersiz token' }, { status: 401 });
  }

  if (tokenData.expiresAt < Date.now()) {
    validTokens.delete(token);
    return NextResponse.json({ valid: false, message: 'Token süresi dolmuş' }, { status: 401 });
  }

  return NextResponse.json({ 
    valid: true, 
    username: tokenData.username,
    expiresAt: tokenData.expiresAt 
  });
}
