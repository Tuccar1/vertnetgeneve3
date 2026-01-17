'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapPin, Globe, Calendar, TrendingUp, Users, Building2 } from 'lucide-react';

interface VisitorLocation {
  country: string;
  city: string;
  count: number;
}

interface Visitor {
  country: string;
  city: string;
  timestamp?: string;
}

interface VisitorMapProps {
  visitors: Visitor[];
}

// Ülke bayrak emoji'leri
const countryFlags: Record<string, string> = {
  'Switzerland': '🇨🇭',
  'Suisse': '🇨🇭',
  'France': '🇫🇷',
  'Germany': '🇩🇪',
  'Allemagne': '🇩🇪',
  'Italy': '🇮🇹',
  'Italie': '🇮🇹',
  'Spain': '🇪🇸',
  'Espagne': '🇪🇸',
  'United Kingdom': '🇬🇧',
  'Royaume-Uni': '🇬🇧',
  'Belgium': '🇧🇪',
  'Belgique': '🇧🇪',
  'Netherlands': '🇳🇱',
  'Pays-Bas': '🇳🇱',
  'Austria': '🇦🇹',
  'Autriche': '🇦🇹',
  'Turkey': '🇹🇷',
  'Türkiye': '🇹🇷',
  'Turquie': '🇹🇷',
  'United States': '🇺🇸',
  'États-Unis': '🇺🇸',
  'Canada': '🇨🇦',
  'Portugal': '🇵🇹',
  'Poland': '🇵🇱',
  'Pologne': '🇵🇱',
  'Luxembourg': '🇱🇺',
  'Monaco': '🇲🇨',
  'Unknown': '🌍',
  'Yerel': '🏠',
};

export default function VisitorMap({ visitors }: VisitorMapProps) {
  const [locations, setLocations] = useState<VisitorLocation[]>([]);
  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly' | 'all'>('all');

  // Zaman filtresine göre ziyaretçileri filtrele
  const filteredVisitors = useMemo(() => {
    if (timeFilter === 'all') return visitors;
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (timeFilter) {
      case 'daily':
        filterDate.setHours(0, 0, 0, 0);
        break;
      case 'weekly':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'monthly':
        filterDate.setMonth(now.getMonth() - 1);
        break;
    }
    
    return visitors.filter(v => {
      if (!v.timestamp) return true;
      const visitDate = new Date(v.timestamp);
      return visitDate >= filterDate;
    });
  }, [visitors, timeFilter]);

  useEffect(() => {
    const locationMap = new Map<string, VisitorLocation>();
    
    filteredVisitors.forEach(visitor => {
      const key = `${visitor.country}-${visitor.city}`;
      if (locationMap.has(key)) {
        locationMap.get(key)!.count++;
      } else {
        locationMap.set(key, {
          country: visitor.country || 'Bilinmiyor',
          city: visitor.city || 'Bilinmiyor',
          count: 1,
        });
      }
    });
    
    setLocations(Array.from(locationMap.values()));
  }, [filteredVisitors]);

  const totalVisitors = locations.reduce((sum, loc) => sum + loc.count, 0);
  const uniqueCountries = new Set(locations.map(loc => loc.country)).size;
  const uniqueCities = locations.length;

  // Ülke bazlı gruplama
  const countryGroups = useMemo(() => {
    const groups: Record<string, { total: number; cities: VisitorLocation[] }> = {};
    locations.forEach(loc => {
      if (!groups[loc.country]) {
        groups[loc.country] = { total: 0, cities: [] };
      }
      groups[loc.country].total += loc.count;
      groups[loc.country].cities.push(loc);
    });
    return Object.entries(groups)
      .sort((a, b) => b[1].total - a[1].total);
  }, [locations]);

  return (
    <div className="admin-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Ziyaretçi Dağılımı</h2>
              <p className="text-sm text-gray-500">Coğrafi konum analizi</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-3 py-1 bg-gray-50 rounded-lg">
              <p className="text-lg font-bold text-gray-900">{totalVisitors}</p>
              <p className="text-xs text-gray-500">Toplam</p>
            </div>
            <div className="text-center px-3 py-1 bg-indigo-50 rounded-lg">
              <p className="text-lg font-bold text-indigo-600">{uniqueCountries}</p>
              <p className="text-xs text-gray-500">Ülke</p>
            </div>
            <div className="text-center px-3 py-1 bg-emerald-50 rounded-lg">
              <p className="text-lg font-bold text-emerald-600">{uniqueCities}</p>
              <p className="text-xs text-gray-500">Şehir</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ülke Bazlı Liste */}
      <div className="p-4">
        {/* Zaman Filtresi */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Ülke & Şehir Dağılımı</h3>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: 'daily', label: 'Günlük' },
              { key: 'weekly', label: 'Haftalık' },
              { key: 'monthly', label: 'Aylık' },
              { key: 'all', label: 'Tümü' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setTimeFilter(filter.key as typeof timeFilter)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  timeFilter === filter.key
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ülke Listesi */}
        {countryGroups.length > 0 ? (
          <div className="space-y-3">
            {countryGroups.map(([country, data], index) => (
              <div key={country} className="bg-gray-50 rounded-xl p-3">
                {/* Ülke Başlığı */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{countryFlags[country] || '🌍'}</span>
                    <span className="font-medium text-gray-900">{country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-gray-900">{data.total}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-gray-200 rounded-full mb-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((data.total / totalVisitors) * 100, 100)}%` }}
                  />
                </div>

                {/* Şehirler */}
                <div className="flex flex-wrap gap-2">
                  {data.cities
                    .sort((a, b) => b.count - a.count)
                    .map((city, cityIndex) => (
                      <div
                        key={cityIndex}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg text-sm border border-gray-100"
                      >
                        <MapPin className="w-3 h-3 text-indigo-500" />
                        <span className="text-gray-700">{city.city}</span>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {city.count}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Bu dönemde ziyaretçi verisi bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}
