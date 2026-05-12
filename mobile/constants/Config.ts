// API base URL configuration
// ─── IMPORTANT: Set your machine's LAN IP below ───────────────────────────
// Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux) and copy your IPv4 address.
const LAN_IP = '192.168.0.160'; // <-- Your PC's LAN IP (backend runs here)

// Set IS_EMULATOR = true if you are running on an Android EMULATOR (not a real phone).
// Android emulators use the special alias 10.0.2.2 to reach the host machine.
// Physical Android phones and all iOS devices must use the actual LAN IP above.
const IS_EMULATOR = false; // <-- change to true only when using Android emulator

import { Platform } from 'react-native';

const getApiBaseUrl = (): string => {
  if (process.env.REACT_NATIVE_API_BASE_URL) {
    return process.env.REACT_NATIVE_API_BASE_URL;
  }
  if (Platform.OS === 'android' && IS_EMULATOR) {
    // Android emulator special loopback to host
    return 'http://10.0.2.2:8000';
  }
  // Physical Android device OR iOS — must use the real LAN IP
  return `http://${LAN_IP}:8000`;
};

export const API_BASE_URL = getApiBaseUrl();

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
