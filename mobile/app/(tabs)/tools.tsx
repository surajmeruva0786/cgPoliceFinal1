import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Video, UserCheck, ChevronRight, Shield } from 'lucide-react-native';
import { Colors } from '../../constants/Config';

const tools = [
    {
        title: 'URL Safety Checker',
        description: 'Verify if a website or link is safe before visiting. Powered by Google Safe Browsing.',
        icon: Search,
        color: Colors.blue,
        gradient: Colors.gradientPrimary,
        route: '/url-checker',
    },
    {
        title: 'Deepfake Video Detector',
        description: 'Scan video calls and recordings for AI-generated manipulation or impersonation.',
        icon: Video,
        color: Colors.purple,
        gradient: Colors.gradientPurple,
        route: '/deepfake-detector',
    },
    {
        title: 'Verify Police Official',
        description: 'Check if the officer contacting you is genuine by verifying their ID or name.',
        icon: UserCheck,
        color: Colors.emerald,
        gradient: Colors.gradientSuccess,
        route: '/verify-official',
    },
];

export default function ToolsScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Protection Tools</Text>
                <Text style={styles.headerSubtitle}>AI-powered tools to keep you safe online</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {tools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.toolCard}
                            onPress={() => router.push(tool.route as any)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.toolCardInner}>
                                <View style={[styles.toolIconBox, { backgroundColor: `${tool.color}20` }]}>
                                    <Icon size={28} color={tool.color} />
                                </View>
                                <View style={styles.toolTextContent}>
                                    <Text style={styles.toolTitle}>{tool.title}</Text>
                                    <Text style={styles.toolDescription}>{tool.description}</Text>
                                </View>
                                <ChevronRight size={20} color={Colors.textMuted} />
                            </View>
                        </TouchableOpacity>
                    );
                })}

                {/* Protection Banner */}
                <View style={styles.infoBanner}>
                    <Shield size={18} color={Colors.blue} />
                    <Text style={styles.infoText}>
                        All tools are powered by advanced AI and government databases. Your data is processed securely and never stored.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: Colors.textPrimary,
    },
    headerSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    toolCard: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 20,
        marginBottom: 14,
        overflow: 'hidden',
    },
    toolCardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        gap: 14,
    },
    toolIconBox: {
        width: 56,
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolTextContent: {
        flex: 1,
    },
    toolTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    toolDescription: {
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 19,
    },
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'rgba(59,130,246,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.2)',
        borderRadius: 14,
        padding: 14,
        marginTop: 8,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
});
