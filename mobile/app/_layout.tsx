import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/Config';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: Colors.background },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                    name="url-checker"
                    options={{ headerShown: true, headerTitle: 'URL Safety Checker', headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }}
                />
                <Stack.Screen
                    name="deepfake-detector"
                    options={{ headerShown: true, headerTitle: 'Deepfake Detector', headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }}
                />
                <Stack.Screen
                    name="verify-official"
                    options={{ headerShown: true, headerTitle: 'Verify Official', headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }}
                />
                <Stack.Screen
                    name="protection-tips"
                    options={{ headerShown: true, headerTitle: 'Cyber Safety Guide', headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }}
                />
            </Stack>
        </>
    );
}
