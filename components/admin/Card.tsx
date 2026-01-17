'use client';

import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  action?: ReactNode;
  headerAction?: ReactNode;
}

export function Card({ children, title, subtitle, className = '', action, headerAction }: CardProps) {
  return (
    <div className={`admin-card ${className}`}>
      {(title || action || headerAction) && (
        <div className="flex items-center justify-between px-5 py-4 admin-card-header">
          <div>
            {title && <h3 className="font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {(action || headerAction) && <div>{action || headerAction}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  iconColor?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  iconColor = 'bg-indigo-500' 
}: StatCardProps) {
  const changeColors = {
    positive: 'text-green-700 bg-green-50',
    negative: 'text-red-700 bg-red-50',
    neutral: 'text-gray-600 bg-gray-100'
  };

  return (
    <div className="admin-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-2 ${changeColors[changeType]}`}>
              {changeType === 'positive' && '↑ '}
              {changeType === 'negative' && '↓ '}
              {change}
            </span>
          )}
        </div>
        <div className={`p-2.5 rounded-lg ${iconColor} text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
