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
import {
    Shield,
    Search,
    Video,
    UserCheck,
    AlertTriangle,
    CheckCircle,
    XCircle,
    TrendingUp,
    BookOpen,
    ChevronRight,
} from 'lucide-react-native';
import { Colors } from '../../constants/Config';

const protectionStats = [
    { label: 'URLs Checked', value: 23, icon: Search, color: Colors.blue },
    { label: 'Threats Blocked', value: 8, icon: Shield, color: Colors.emerald },
    { label: 'Reports Submitted', value: 2, icon: AlertTriangle, color: Colors.amber },
    { label: 'Officials Verified', value: 1, icon: UserCheck, color: Colors.purple },
];

const quickActions = [
    { title: 'Check URL', description: 'Verify link safety', icon: Search, color: Colors.blue, route: '/url-checker' },
    { title: 'Detect Deepfake', description: 'Scan for manipulation', icon: Video, color: Colors.purple, route: '/deepfake-detector' },
    { title: 'Verify Official', description: 'Check officer identity', icon: UserCheck, color: Colors.emerald, route: '/verify-official' },
    { title: 'Safety Guide', description: 'Protection tips', icon: BookOpen, color: Colors.amber, route: '/protection-tips' },
];

const recentActivity = [
    { id: 1, title: 'URL Safety Check', result: 'safe', details: 'amazon.in verified as safe', time: '2 hours ago' },
    { id: 2, title: 'Malicious URL Blocked', result: 'blocked', details: 'fake-sbi-login.com prevented', time: '1 day ago' },
    { id: 3, title: 'Fraud Reported', result: 'submitted', details: 'Digital arrest scam call reported', time: '3 days ago' },
];

const threatAlerts = [
    { id: 1, title: 'Digital Arrest Scam Active', severity: 'high', description: 'Fake police calls targeting citizens in your area', time: '2 hours ago' },
    { id: 2, title: 'Phishing SMS Campaign', severity: 'medium', description: 'Fake bank KYC update messages being sent', time: '1 day ago' },
];

export default function DashboardScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Welcome Back</Text>
                    <Text style={styles.headerSubtitle}>Your personal protection dashboard</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>C</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Protection Stats */}
                <View style={styles.statsGrid}>
                    {protectionStats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <View key={index} style={styles.statCard}>
                                <View style={[styles.statIconBox, { backgroundColor: `${stat.color}20` }]}>
                                    <Icon size={22} color={stat.color} />
                                </View>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                        );
                    })}
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionsGrid}>
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.actionCard}
                                onPress={() => router.push(action.route as any)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.actionIconBox, { backgroundColor: `${action.color}20` }]}>
                                    <Icon size={24} color={action.color} />
                                </View>
                                <Text style={styles.actionTitle}>{action.title}</Text>
                                <Text style={styles.actionDesc}>{action.description}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Threat Alerts */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Active Threat Alerts</Text>
                    <View style={styles.liveDot} />
                </View>
                {threatAlerts.map((alert) => (
                    <View
                        key={alert.id}
                        style={[
                            styles.alertCard,
                            {
                                backgroundColor: alert.severity === 'high' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                                borderColor: alert.severity === 'high' ? 'rgba(239,68,68,0.25)' : 'rgba(245,158,11,0.25)',
                            },
                        ]}
                    >
                        <AlertTriangle
                            size={18}
                            color={alert.severity === 'high' ? Colors.red : Colors.amber}
                        />
                        <View style={styles.alertContent}>
                            <Text style={styles.alertTitle}>{alert.title}</Text>
                            <Text style={styles.alertDesc}>{alert.description}</Text>
                            <Text style={styles.alertTime}>{alert.time}</Text>
                        </View>
                    </View>
                ))}

                {/* Recent Activity */}
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Recent Activity</Text>
                {recentActivity.map((activity) => (
                    <View key={activity.id} style={styles.activityCard}>
                        <View
                            style={[
                                styles.activityIconBox,
                                {
                                    backgroundColor:
                                        activity.result === 'safe'
                                            ? 'rgba(16,185,129,0.15)'
                                            : activity.result === 'blocked'
                                                ? 'rgba(239,68,68,0.15)'
                                                : 'rgba(59,130,246,0.15)',
                                },
                            ]}
                        >
                            {activity.result === 'safe' && <CheckCircle size={18} color={Colors.emerald} />}
                            {activity.result === 'blocked' && <XCircle size={18} color={Colors.red} />}
                            {activity.result === 'submitted' && <TrendingUp size={18} color={Colors.blue} />}
                        </View>
                        <View style={styles.activityContent}>
                            <Text style={styles.activityTitle}>{activity.title}</Text>
                            <Text style={styles.activityDetails}>{activity.details}</Text>
                            <Text style={styles.activityTime}>{activity.time}</Text>
                        </View>
                    </View>
                ))}

                {/* Stay Protected Banner */}
                <TouchableOpacity
                    style={styles.protectionBanner}
                    onPress={() => router.push('/protection-tips')}
                    activeOpacity={0.7}
                >
                    <View style={styles.protectionBannerLeft}>
                        <View style={styles.protectionIconBox}>
                            <Shield size={24} color={Colors.blue} />
                        </View>
                        <View>
                            <Text style={styles.protectionTitle}>Stay Protected</Text>
                            <Text style={styles.protectionDesc}>Learn how to identify cyber frauds</Text>
                        </View>
                    </View>
                    <ChevronRight size={20} color={Colors.textMuted} />
                </TouchableOpacity>

                <View style={{ height: 20 }} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    avatarContainer: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        width: '47%',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 18,
        padding: 16,
    },
    statIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.textPrimary,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 14,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.red,
        marginBottom: 14,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 24,
    },
    actionCard: {
        width: '47%',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 18,
        padding: 16,
    },
    actionIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    actionDesc: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    alertDesc: {
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
    alertTime: {
        fontSize: 11,
        color: Colors.textMuted,
        marginTop: 6,
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
    },
    activityIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    activityDetails: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
    activityTime: {
        fontSize: 11,
        color: Colors.textMuted,
        marginTop: 4,
    },
    protectionBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(59,130,246,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.25)',
        borderRadius: 18,
        padding: 16,
        marginTop: 16,
    },
    protectionBannerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    protectionIconBox: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(59,130,246,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    protectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    protectionDesc: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
});
