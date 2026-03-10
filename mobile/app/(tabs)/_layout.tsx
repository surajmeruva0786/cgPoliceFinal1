import { Tabs } from 'expo-router';
import { Home, Wrench, AlertTriangle, Bell, Bot } from 'lucide-react-native';
import { Colors } from '../../constants/Config';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopColor: Colors.border,
                    borderTopWidth: 1,
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: Colors.blueLight,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="tools"
                options={{
                    title: 'Tools',
                    tabBarIcon: ({ color, size }) => <Wrench size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="report"
                options={{
                    title: 'Report',
                    tabBarIcon: ({ color, size }) => <AlertTriangle size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="alerts"
                options={{
                    title: 'Alerts',
                    tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="assistant"
                options={{
                    title: 'AI Chat',
                    tabBarIcon: ({ color, size }) => <Bot size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
