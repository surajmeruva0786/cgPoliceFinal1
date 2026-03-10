import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Phone, Video, MessageSquare, CreditCard, Shield, AlertTriangle } from 'lucide-react-native';
import { Colors } from '../constants/Config';

const tips = [
    {
        icon: Phone,
        title: 'Digital Arrest Scams',
        color: Colors.red,
        points: [
            'Police NEVER make arrest calls demanding money',
            'No government agency asks for payment over phone',
            'Hang up immediately if threatened with arrest',
            'Verify through official channels - Call 100 or 1930',
            'Do not share OTP, card details, or transfer money',
        ],
    },
    {
        icon: Video,
        title: 'Deepfake Video Calls',
        color: Colors.purple,
        points: [
            'Criminals use AI to impersonate officials in video calls',
            'Ask questions only you and the real person would know',
            'Look for unnatural facial movements or voice glitches',
            'Request to meet in person at police station',
            'Record the call if possible and report immediately',
        ],
    },
    {
        icon: MessageSquare,
        title: 'SMS & WhatsApp Frauds',
        color: Colors.emerald,
        points: [
            'Banks never ask for OTP, PIN, or card details via message',
            'Verify sender before clicking any links',
            'Check for spelling errors and suspicious URLs',
            "Don't download APK files from unknown sources",
            'Forward suspicious messages to 1909',
        ],
    },
    {
        icon: CreditCard,
        title: 'UPI & Payment Frauds',
        color: Colors.amber,
        points: [
            'Never accept payment requests from unknown numbers',
            'Verify UPI ID before sending money',
            "Don't share QR codes or screenshots of payment apps",
            'Set daily transaction limits on your accounts',
            'Report unauthorized transactions within 24 hours',
        ],
    },
    {
        icon: Shield,
        title: 'Investment Scams',
        color: Colors.blue,
        points: [
            'If returns sound too good to be true, they usually are',
            'Verify investment platforms with SEBI/RBI',
            "Don't invest based on WhatsApp group tips",
            'Research company credentials before investing',
            'Beware of celebrity endorsement deepfakes',
        ],
    },
];

const generalRules = [
    'Never share OTP with anyone',
    'Always verify caller identity through official channels',
    "Don't click on shortened URLs from unknown sources",
    'Enable two-factor authentication on all accounts',
    'Keep your device software and apps updated',
    'Use strong, unique passwords for different accounts',
    'Be skeptical of urgent messages demanding immediate action',
    'Report all suspicious activity through this portal',
];

export default function ProtectionTipsScreen() {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Emergency Banner */}
                <TouchableOpacity
                    style={styles.emergencyBanner}
                    onPress={() => Linking.openURL('tel:1930')}
                    activeOpacity={0.8}
                >
                    <View style={styles.emergencyLeft}>
                        <View style={styles.emergencyIcon}>
                            <AlertTriangle size={24} color={Colors.red} />
                        </View>
                        <View>
                            <Text style={styles.emergencyTitle}>Emergency Helpline</Text>
                            <Text style={styles.emergencyDesc}>If you're being scammed right now</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.emergencyNumber}>1930</Text>
                        <Text style={styles.emergencyMeta}>Toll Free • 24/7</Text>
                    </View>
                </TouchableOpacity>

                {/* Tips Cards */}
                {tips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                        <View key={index} style={styles.tipCard}>
                            <View style={styles.tipHeader}>
                                <View style={[styles.tipIconBox, { backgroundColor: `${tip.color}20` }]}>
                                    <Icon size={22} color={tip.color} />
                                </View>
                                <Text style={styles.tipTitle}>{tip.title}</Text>
                            </View>
                            {tip.points.map((point, idx) => (
                                <View key={idx} style={styles.pointRow}>
                                    <View style={[styles.pointDot, { backgroundColor: tip.color }]} />
                                    <Text style={styles.pointText}>{point}</Text>
                                </View>
                            ))}
                        </View>
                    );
                })}

                {/* General Rules */}
                <View style={styles.generalCard}>
                    <Text style={styles.generalTitle}>General Safety Rules</Text>
                    {generalRules.map((rule, idx) => (
                        <View key={idx} style={styles.ruleRow}>
                            <Shield size={16} color={Colors.blue} />
                            <Text style={styles.ruleText}>{rule}</Text>
                        </View>
                    ))}
                </View>

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
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    emergencyBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(239,68,68,0.3)',
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
    },
    emergencyLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    emergencyIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(239,68,68,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emergencyTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    emergencyDesc: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    emergencyNumber: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.textPrimary,
        textAlign: 'right',
    },
    emergencyMeta: {
        fontSize: 11,
        color: Colors.textSecondary,
        textAlign: 'right',
    },
    tipCard: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 18,
        padding: 18,
        marginBottom: 14,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    tipIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    pointRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 8,
    },
    pointDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 6,
    },
    pointText: {
        flex: 1,
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 20,
    },
    generalCard: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 18,
        padding: 18,
        marginTop: 6,
    },
    generalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 16,
    },
    ruleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
    },
    ruleText: {
        flex: 1,
        fontSize: 13,
        color: Colors.textSecondary,
        lineHeight: 19,
    },
});
