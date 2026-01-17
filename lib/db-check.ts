// Veritabanı bağlantı durumunu kontrol eder
// DATABASE_URL varsa true döner

export function isDatabaseEnabled(): boolean {
  return !!process.env.DATABASE_URL;
}

export function getStorageMode(): 'database' | 'file' {
  return isDatabaseEnabled() ? 'database' : 'file';
}
