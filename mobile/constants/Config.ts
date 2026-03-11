// Change this to your computer's local network IP when testing on physical device via Expo Go
// e.g., 'http://192.168.1.5:8000'
export const API_BASE_URL = 'http://172.16.196.44:8000';

export const Colors = {
    // Base
    background: '#0a0f1e',
    surface: '#111827',
    surfaceLight: '#1e293b',
    card: '#162032',
    border: 'rgba(255,255,255,0.08)',
    borderLight: 'rgba(255,255,255,0.15)',

    // Text
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',

    // Accent
    blue: '#3b82f6',
    blueLight: '#60a5fa',
    indigo: '#6366f1',
    purple: '#a855f7',
    emerald: '#10b981',
    green: '#22c55e',
    amber: '#f59e0b',
    red: '#ef4444',
    pink: '#ec4899',

    // Gradients (as arrays for LinearGradient)
    gradientPrimary: ['#3b82f6', '#6366f1'] as const,
    gradientSuccess: ['#10b981', '#22c55e'] as const,
    gradientDanger: ['#ef4444', '#ec4899'] as const,
    gradientWarning: ['#f59e0b', '#f97316'] as const,
    gradientPurple: ['#a855f7', '#ec4899'] as const,
};
