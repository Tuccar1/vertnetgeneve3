'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Leaf,
  ExternalLink,
  Bot,
  Palette
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { name: 'Dashboard', href: '/admin/panel', icon: LayoutDashboard },
  { name: 'Chatbot', href: '/admin/panel/chatbot', icon: Bot },
  { name: 'Özelleştirme', href: '/admin/panel/customize', icon: Palette },
  { name: 'Ayarlar', href: '/admin/panel/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full transition-all duration-300
        ${collapsed ? 'w-16' : 'w-56'} bg-[#1b1b47] shadow-xl`}
      style={{ zIndex: 9999 }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-white/10">
        <button 
          onClick={() => handleNavigation('/admin/panel')} 
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-sm text-white">Vertnetgeneve</span>
          )}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white/70 hover:text-white"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-2 flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin/panel' && pathname.startsWith(item.href));
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                    ${isActive 
                      ? 'bg-white/15 text-white' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* View Site Link */}
      <div className="absolute bottom-12 left-0 right-0 px-2">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-white/70 
            hover:bg-white/10 hover:text-white transition-all duration-200
            ${collapsed ? 'justify-center' : ''}`}
        >
          <ExternalLink className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Siteyi Görüntüle</span>}
        </Link>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-white/10">
        <button
          onClick={async () => {
            try {
              await fetch('/api/admin/logout', { method: 'POST' });
              localStorage.removeItem('admin_authenticated');
              localStorage.removeItem('admin_token');
              localStorage.removeItem('admin_user');
              window.location.href = '/admin/login';
            } catch (error) {
              window.location.href = '/admin/login';
            }
          }}
          className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-white/70 
            hover:bg-red-500/20 hover:text-red-300 transition-all duration-200
            ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Çıkış Yap</span>}
        </button>
      </div>
    </aside>
  );
}
