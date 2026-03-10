import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, AlertTriangle, CheckCircle, Upload, XCircle } from 'lucide-react-native';
import { Colors, API_BASE_URL } from '../constants/Config';

export default function DeepfakeDetectorScreen() {
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState<{ prediction: string; confidence: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePickFile = async () => {
        try {
            const docResult = await DocumentPicker.getDocumentAsync({
                type: 'video/*',
                copyToCacheDirectory: true,
            });

            if (docResult.canceled) return;

            const file = docResult.assets[0];
            setIsUploading(true);
            setError(null);
            setResult(null);

            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                name: file.name,
                type: file.mimeType || 'video/mp4',
            } as any);

            const response = await fetch(`${API_BASE_URL}/detect`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                throw new Error('Detection failed. Is the backend server running?');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Upload Card */}
                <View style={styles.card}>
                    <View style={styles.uploadArea}>
                        {isUploading ? (
                            <View style={styles.centerContent}>
                                <ActivityIndicator size="large" color={Colors.purple} />
                                <Text style={styles.uploadingTitle}>Analyzing Video...</Text>
                                <Text style={styles.uploadingDesc}>Please wait while our AI inspects frames.</Text>
                            </View>
                        ) : result ? (
                            <View style={styles.centerContent}>
                                {result.prediction === 'FAKE' ? (
                                    <XCircle size={56} color={Colors.red} />
                                ) : (
                                    <CheckCircle size={56} color={Colors.emerald} />
                                )}
                                <Text style={styles.resultTitle}>
                                    Result:{' '}
                                    <Text style={{ color: result.prediction === 'FAKE' ? Colors.red : Colors.emerald }}>
                                        {result.prediction}
                                    </Text>
                                </Text>
                                <Text style={styles.resultConfidence}>
                                    Confidence: {(result.confidence * 100).toFixed(1)}%
                                </Text>
                                <TouchableOpacity
                                    style={styles.retryBtn}
                                    onPress={() => setResult(null)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.retryText}>Analyze Another Video</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.centerContent}>
                                <Video size={56} color={Colors.purple} />
                                <Text style={styles.uploadTitle}>Upload Video</Text>
                                <Text style={styles.uploadDesc}>Supports MP4, MOV, AVI • Max 50MB</Text>
                                <TouchableOpacity
                                    style={styles.uploadBtn}
                                    onPress={handlePickFile}
                                    activeOpacity={0.7}
                                >
                                    <Upload size={20} color={Colors.purple} />
                                    <Text style={styles.uploadBtnText}>Choose Video</Text>
                                </TouchableOpacity>
                                {error && (
                                    <View style={styles.errorBox}>
                                        <AlertTriangle size={14} color={Colors.red} />
                                        <Text style={styles.errorText}>{error}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>

                {/* Warning */}
                <View style={styles.warningBox}>
                    <AlertTriangle size={16} color={Colors.amber} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.warningTitle}>Deepfake Warning</Text>
                        <Text style={styles.warningText}>
                            Criminals use deepfake technology to impersonate police officers and government officials in video calls. Always verify identity through official channels.
                        </Text>
                    </View>
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
        marginBottom: 16,
    },
    uploadArea: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: 32,
    },
    centerContent: {
        alignItems: 'center',
        gap: 12,
    },
    uploadTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    uploadDesc: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(168,85,247,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(168,85,247,0.3)',
        borderRadius: 14,
        paddingHorizontal: 24,
        paddingVertical: 14,
        marginTop: 8,
    },
    uploadBtnText: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.purple,
    },
    uploadingTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    uploadingDesc: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    resultTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.textPrimary,
    },
    resultConfidence: {
        fontSize: 15,
        color: Colors.textSecondary,
    },
    retryBtn: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 8,
    },
    retryText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textPrimary,
    },
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderRadius: 10,
        padding: 10,
        marginTop: 8,
    },
    errorText: {
        flex: 1,
        fontSize: 12,
        color: Colors.red,
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'rgba(245,158,11,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(245,158,11,0.2)',
        borderRadius: 14,
        padding: 14,
    },
    warningTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.amber,
        marginBottom: 4,
    },
    warningText: {
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
});
