import { NextRequest, NextResponse } from 'next/server';
import { SiteSettingsData, defaultSiteSettings } from '@/lib/site-config';
import { themePresets } from '@/lib/theme-presets';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'site-settings.json');

interface StoredSettings {
  draft: SiteSettingsData;
  published: SiteSettingsData;
  history: Array<{
    id: string;
    timestamp: string;
    changes: Array<{ path: string; oldValue: unknown; newValue: unknown }>;
    settings: SiteSettingsData;
  }>;
  lastUpdated: string;
}

// Dosya yoksa oluştur
async function ensureDataFile(): Promise<StoredSettings> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    const defaultData: StoredSettings = {
      draft: defaultSiteSettings,
      published: defaultSiteSettings,
      history: [],
      lastUpdated: new Date().toISOString(),
    };
    
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
    
    return defaultData;
  }
}

// GET - Ayarları getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // draft, published, history, presets, all
    
    const data = await ensureDataFile();
    
    switch (type) {
      case 'draft':
        return NextResponse.json({ success: true, data: data.draft });
      
      case 'published':
        return NextResponse.json({ success: true, data: data.published });
      
      case 'history':
        return NextResponse.json({ success: true, data: data.history });
      
      case 'presets':
        return NextResponse.json({ success: true, data: themePresets });
      
      default:
        return NextResponse.json({
          success: true,
          data: {
            draft: data.draft,
            published: data.published,
            history: data.history,
            presets: themePresets,
          },
        });
    }
  } catch (error) {
    console.error('Ayarlar getirilirken hata:', error);
    return NextResponse.json(
      { success: false, error: 'Ayarlar getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Taslak kaydet
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { settings, addToHistory = true } = body;
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Ayarlar gerekli' },
        { status: 400 }
      );
    }
    
    const data = await ensureDataFile();
    
    // History'e ekle (opsiyonel)
    if (addToHistory) {
      const historyItem = {
        id: Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
        timestamp: new Date().toISOString(),
        changes: [], // Değişiklikler client tarafında hesaplanır
        settings: settings as SiteSettingsData,
      };
      
      data.history.push(historyItem);
      
      // 100'den fazla kayıt varsa eskilerini sil
      if (data.history.length > 100) {
        data.history = data.history.slice(-100);
      }
    }
    
    data.draft = settings;
    data.lastUpdated = new Date().toISOString();
    
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Taslak kaydedildi',
      data: data.draft,
    });
  } catch (error) {
    console.error('Taslak kaydedilirken hata:', error);
    return NextResponse.json(
      { success: false, error: 'Taslak kaydedilemedi' },
      { status: 500 }
    );
  }
}

// PUT - Yayınla
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { settings } = body;
    
    const data = await ensureDataFile();
    
    // Eğer settings gönderilmemişse mevcut taslağı yayınla
    const settingsToPublish = settings || data.draft;
    
    data.published = settingsToPublish;
    data.draft = settingsToPublish;
    data.lastUpdated = new Date().toISOString();
    
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Ayarlar yayınlandı',
      data: data.published,
    });
  } catch (error) {
    console.error('Yayınlanırken hata:', error);
    return NextResponse.json(
      { success: false, error: 'Yayınlanamadı' },
      { status: 500 }
    );
  }
}

// DELETE - History temizle veya varsayılana sıfırla
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'clearHistory'; // clearHistory, resetToDefault, resetToPublished
    
    const data = await ensureDataFile();
    
    switch (action) {
      case 'clearHistory':
        data.history = [];
        break;
      
      case 'resetToDefault':
        data.draft = defaultSiteSettings;
        break;
      
      case 'resetToPublished':
        data.draft = data.published;
        break;
      
      default:
        return NextResponse.json(
          { success: false, error: 'Geçersiz aksiyon' },
          { status: 400 }
        );
    }
    
    data.lastUpdated = new Date().toISOString();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'İşlem tamamlandı',
      data: { draft: data.draft, history: data.history },
    });
  } catch (error) {
    console.error('Silme işleminde hata:', error);
    return NextResponse.json(
      { success: false, error: 'İşlem başarısız' },
      { status: 500 }
    );
  }
}
