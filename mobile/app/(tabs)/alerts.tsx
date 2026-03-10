import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertTriangle, MapPin, Clock } from 'lucide-react-native';
import { Colors, API_BASE_URL } from '../../constants/Config';

const typeConfig: Record<string, { bg: string; border: string; text: string; label: string }> = {
    critical: { bg: 'rgba(230,57,70,0.12)', border: 'rgba(230,57,70,0.35)', text: '#E63946', label: 'CRITICAL' },
    high: { bg: 'rgba(244,162,97,0.12)', border: 'rgba(244,162,97,0.35)', text: '#F4A261', label: 'HIGH' },
    medium: { bg: 'rgba(47,128,237,0.12)', border: 'rgba(47,128,237,0.35)', text: '#2F80ED', label: 'MEDIUM' },
    low: { bg: 'rgba(42,157,143,0.12)', border: 'rgba(42,157,143,0.35)', text: '#2A9D8F', label: 'LOW' },
};

export default function AlertsScreen() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchAlerts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/alerts?active_only=true&limit=50`);
            const data = await response.json();
            setAlerts(data);
        } catch (err) {
            console.log('Could not fetch alerts:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 10000); // Refresh every 10s
        return () => clearInterval(interval);
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchAlerts();
    };

    const criticalCount = alerts.filter(a => a.severity === 'critical').length;
    const highCount = alerts.filter(a => a.severity === 'high').length;

    const statCards = [
        { label: 'Critical', value: String(criticalCount), color: '#E63946' },
        { label: 'High Priority', value: String(highCount), color: '#F4A261' },
        { label: 'Active Alerts', value: String(alerts.length), color: '#2F80ED' },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Live Fraud Alerts</Text>
                <Text style={styles.headerSubtitle}>Real-time alerts from the CG Police command center</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.blue} />
                }
            >
                {/* Stats Row */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
                    {statCards.map((stat, index) => (
                        <View
                            key={index}
                            style={[styles.statCard, { backgroundColor: `${stat.color}15`, borderColor: `${stat.color}35` }]}
                        >
                            <Text style={[styles.statLabel, { color: stat.color }]}>{stat.label}</Text>
                            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Loading */}
                {loading && (
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color={Colors.blue} />
                        <Text style={styles.loadingText}>Loading alerts...</Text>
                    </View>
                )}

                {/* Empty state */}
                {!loading && alerts.length === 0 && (
                    <View style={styles.emptyBox}>
                        <AlertTriangle size={40} color={Colors.textMuted} />
                        <Text style={styles.emptyTitle}>No Active Alerts</Text>
                        <Text style={styles.emptyDesc}>
                            When officials publish alerts, they'll appear here in real-time. Pull down to refresh.
                        </Text>
                    </View>
                )}

                {/* Alert Cards — from database */}
                {alerts.map((alert) => {
                    const config = typeConfig[alert.severity] || typeConfig.medium;
                    return (
                        <View
                            key={alert.id}
                            style={[
                                styles.alertCard,
                                {
                                    backgroundColor: config.bg,
                                    borderColor: config.border,
                                    borderLeftWidth: 4,
                                    borderLeftColor: config.text,
                                },
                            ]}
                        >
                            <View style={[styles.alertIconBox, { backgroundColor: config.bg }]}>
                                <AlertTriangle size={22} color={config.text} />
                            </View>
                            <View style={styles.alertContent}>
                                <View style={styles.alertTitleRow}>
                                    <Text style={[styles.alertTitle, { flex: 1 }]}>{alert.title}</Text>
                                    <View style={[styles.severityBadge, { backgroundColor: config.bg }]}>
                                        <Text style={[styles.severityText, { color: config.text }]}>{config.label}</Text>
                                    </View>
                                </View>
                                <Text style={styles.alertDesc}>{alert.description}</Text>
                                <View style={styles.alertMeta}>
                                    <View style={styles.metaItem}>
                                        <MapPin size={12} color={Colors.textMuted} />
                                        <Text style={styles.metaText}>{alert.location}</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Clock size={12} color={Colors.textMuted} />
                                        <Text style={styles.metaText}>{new Date(alert.created_at).toLocaleString()}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}

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
    statsScroll: {
        marginBottom: 20,
    },
    statCard: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 14,
        marginRight: 12,
        minWidth: 120,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 28,
        fontWeight: '800',
    },
    loadingBox: {
        alignItems: 'center',
        paddingVertical: 40,
        gap: 12,
    },
    loadingText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    emptyBox: {
        alignItems: 'center',
        paddingVertical: 40,
        gap: 12,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    emptyDesc: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
    alertCard: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        gap: 12,
    },
    alertIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertContent: {
        flex: 1,
    },
    alertTitleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        marginBottom: 6,
    },
    alertTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    severityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
    },
    severityText: {
        fontSize: 10,
        fontWeight: '800',
    },
    alertDesc: {
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 19,
        marginBottom: 8,
    },
    alertMeta: {
        flexDirection: 'row',
        gap: 16,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 11,
        color: Colors.textMuted,
    },
});
