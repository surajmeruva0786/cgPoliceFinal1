import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UserCheck, Search, AlertTriangle } from 'lucide-react-native';
import { Colors } from '../constants/Config';

export default function VerifyOfficialScreen() {
    const [officerId, setOfficerId] = useState('');
    const [department, setDepartment] = useState('');

    const handleVerify = () => {
        // Verification logic placeholder
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.card}>
                    <Text style={styles.label}>Officer Name or ID Number</Text>
                    <View style={styles.inputRow}>
                        <Search size={20} color={Colors.textMuted} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter officer name or ID..."
                            placeholderTextColor={Colors.textMuted}
                            value={officerId}
                            onChangeText={setOfficerId}
                        />
                    </View>

                    <Text style={styles.label}>Department / Location (Optional)</Text>
                    <TextInput
                        style={styles.inputFull}
                        placeholder="e.g., Mumbai Cyber Crime Cell"
                        placeholderTextColor={Colors.textMuted}
                        value={department}
                        onChangeText={setDepartment}
                    />

                    <TouchableOpacity
                        style={[styles.verifyBtn, !officerId.trim() && { opacity: 0.5 }]}
                        onPress={handleVerify}
                        disabled={!officerId.trim()}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={Colors.gradientSuccess}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.verifyBtnGradient}
                        >
                            <UserCheck size={20} color="#fff" />
                            <Text style={styles.verifyBtnText}>Verify Identity</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Warning */}
                <View style={styles.warningBox}>
                    <AlertTriangle size={16} color={Colors.red} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.warningTitle}>Important</Text>
                        <Text style={styles.warningText}>
                            Real police officers will NEVER demand money over phone or video call. If someone claims to be police and asks for payment, hang up immediately and verify through this portal or call 1930.
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
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: 10,
        marginTop: 8,
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
        marginBottom: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
        paddingVertical: 14,
    },
    inputFull: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: Colors.textPrimary,
        marginBottom: 20,
    },
    verifyBtn: {
        borderRadius: 14,
        overflow: 'hidden',
    },
    verifyBtnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    verifyBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    warningBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'rgba(239,68,68,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(239,68,68,0.2)',
        borderRadius: 14,
        padding: 14,
    },
    warningTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.red,
        marginBottom: 4,
    },
    warningText: {
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
});
