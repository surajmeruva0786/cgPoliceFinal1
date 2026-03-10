import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native';
import { Colors, API_BASE_URL } from '../constants/Config';

export default function URLCheckerScreen() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState<any>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheck = async () => {
        if (!url.trim()) return;
        setIsChecking(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/check-url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url }),
            });

            const data = await response.json();

            if (data.status === 'UNSAFE') {
                setResult({
                    safe: false,
                    confidence: 100,
                    threats: data.threats.map((t: any) => `${t.threatType} on ${t.platformType}`),
                    category: data.threats[0]?.threatType || 'Potential Security Threat',
                });
            } else if (data.status === 'SAFE') {
                setResult({
                    safe: true,
                    confidence: 100,
                    threats: [],
                    category: 'Legitimate Website',
                });
            }
        } catch (err) {
            setError('Could not connect to server. Is the backend running?');
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Input */}
                <View style={styles.card}>
                    <Text style={styles.label}>Enter URL to Check</Text>
                    <View style={styles.inputRow}>
                        <Search size={20} color={Colors.textMuted} />
                        <TextInput
                            style={styles.input}
                            placeholder="https://example.com"
                            placeholderTextColor={Colors.textMuted}
                            value={url}
                            onChangeText={setUrl}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="url"
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.checkBtn, (!url.trim() || isChecking) && { opacity: 0.5 }]}
                        onPress={handleCheck}
                        disabled={!url.trim() || isChecking}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={Colors.gradientPrimary}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.checkBtnGradient}
                        >
                            {isChecking ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Shield size={20} color="#fff" />
                                    <Text style={styles.checkBtnText}>Check URL</Text>
                                </>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Error */}
                {error && (
                    <View style={styles.errorBox}>
                        <AlertTriangle size={16} color={Colors.red} />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                {/* Result */}
                {result && (
                    <View style={[styles.card, { borderColor: result.safe ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)' }]}>
                        <View style={styles.resultHeader}>
                            <Text style={styles.resultTitle}>Safety Report</Text>
                            <View
                                style={[
                                    styles.resultBadge,
                                    { backgroundColor: result.safe ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)' },
                                ]}
                            >
                                {result.safe ? (
                                    <CheckCircle size={18} color={Colors.emerald} />
                                ) : (
                                    <XCircle size={18} color={Colors.red} />
                                )}
                                <Text
                                    style={[styles.resultBadgeText, { color: result.safe ? Colors.emerald : Colors.red }]}
                                >
                                    {result.safe ? 'SAFE' : 'DANGEROUS'}
                                </Text>
                            </View>
                        </View>

                        {/* Confidence */}
                        <View style={styles.confidenceBox}>
                            <View style={styles.confidenceHeader}>
                                <Text style={styles.confidenceLabel}>Safety Confidence</Text>
                                <Text style={[styles.confidenceValue, { color: result.safe ? Colors.emerald : Colors.red }]}>
                                    {result.confidence}%
                                </Text>
                            </View>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        {
                                            width: `${result.confidence}%`,
                                            backgroundColor: result.safe ? Colors.emerald : Colors.red,
                                        },
                                    ]}
                                />
                            </View>
                        </View>

                        {/* Threats */}
                        {!result.safe && result.threats.length > 0 && (
                            <View>
                                <Text style={styles.threatsLabel}>Detected Threats:</Text>
                                {result.threats.map((threat: string, index: number) => (
                                    <View key={index} style={styles.threatItem}>
                                        <AlertTriangle size={14} color={Colors.red} />
                                        <Text style={styles.threatText}>{threat}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Category & Recommendation */}
                        <View style={styles.infoRow}>
                            <View style={styles.infoCard}>
                                <Text style={styles.infoLabel}>Category</Text>
                                <Text style={styles.infoValue}>{result.category}</Text>
                            </View>
                            <View style={[styles.infoCard, { backgroundColor: result.safe ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)' }]}>
                                <Text style={[styles.infoLabel, { color: result.safe ? Colors.emerald : Colors.red }]}>
                                    Recommendation
                                </Text>
                                <Text style={[styles.infoValue, { color: result.safe ? Colors.emerald : Colors.red, fontWeight: '800' }]}>
                                    {result.safe ? 'SAFE TO VISIT' : 'DO NOT VISIT'}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Tip */}
                <View style={styles.tipBox}>
                    <Shield size={16} color={Colors.blue} />
                    <Text style={styles.tipText}>
                        Always check URLs before clicking, especially in SMS, WhatsApp, or email. Fraudsters create fake websites that look identical to real ones.
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
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 20,
        padding: 20,
        marginBottom: 14,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: 12,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,
        paddingHorizontal: 14,
        gap: 10,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
        paddingVertical: 14,
    },
    checkBtn: {
        borderRadius: 14,
        overflow: 'hidden',
    },
    checkBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    checkBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(239,68,68,0.25)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 14,
    },
    errorText: {
        flex: 1,
        fontSize: 13,
        color: Colors.red,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    resultBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
    },
    resultBadgeText: {
        fontSize: 14,
        fontWeight: '800',
    },
    confidenceBox: {
        marginBottom: 16,
    },
    confidenceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    confidenceLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    confidenceValue: {
        fontSize: 16,
        fontWeight: '800',
    },
    progressBar: {
        height: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 5,
    },
    threatsLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.textPrimary,
        marginBottom: 8,
    },
    threatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(239,68,68,0.08)',
        borderRadius: 10,
        padding: 10,
        marginBottom: 6,
    },
    threatText: {
        flex: 1,
        fontSize: 13,
        color: Colors.textSecondary,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 14,
    },
    infoCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 12,
    },
    infoLabel: {
        fontSize: 11,
        color: Colors.textMuted,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    tipBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'rgba(59,130,246,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.2)',
        borderRadius: 14,
        padding: 14,
    },
    tipText: {
        flex: 1,
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
});
