import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Phone, Lock, ChevronRight, UserPlus } from 'lucide-react-native';
import { Colors, API_BASE_URL as API_BASE } from '../constants/Config';

export default function LoginScreen() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (phone.length < 10 || password.length < 1) return;
        setLoading(true);
        try {
            // BYPASS FOR PROTOTYPING
            (global as any).citizenId = 1;
            (global as any).citizenName = 'Citizen';
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Error', 'Navigation failed.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (phone.length < 10 || password.length < 1) return;
        setLoading(true);
        try {
            // BYPASS FOR PROTOTYPING
            (global as any).citizenId = 1;
            (global as any).citizenName = name || 'Citizen';
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Error', 'Navigation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0a0f1e', '#111827', '#0a0f1e']}
                style={StyleSheet.absoluteFillObject}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Logo & Branding */}
                    <View style={styles.brandingSection}>
                        <LinearGradient
                            colors={['#f59e0b', '#ffffff', '#22c55e']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.logoContainer}
                        >
                            <Shield size={40} color="#0a0f1e" strokeWidth={2.5} />
                        </LinearGradient>

                        <Text style={styles.title}>National Digital Fraud</Text>
                        <Text style={styles.titleGradient}>Prevention Platform</Text>
                        <Text style={styles.subtitle}>Citizen Protection Portal</Text>

                        <View style={styles.statusRow}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>System Status: Fully Operational</Text>
                        </View>
                    </View>

                    {/* Login Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>
                            {isRegister ? 'Create Account' : 'Secure Login'}
                        </Text>
                        <Text style={styles.cardSubtitle}>
                            {isRegister
                                ? 'Register with your phone number and password'
                                : 'Enter your phone number and password'}
                        </Text>

                        <View style={styles.inputWrapper}>
                            {isRegister && (
                                <View style={styles.inputContainer}>
                                    <UserPlus size={20} color={Colors.textMuted} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Full Name"
                                        placeholderTextColor={Colors.textMuted}
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            )}

                            <View style={styles.inputContainer}>
                                <Phone size={20} color={Colors.textMuted} style={styles.inputIcon} />
                                <Text style={styles.prefix}>+91</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mobile Number"
                                    placeholderTextColor={Colors.textMuted}
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                    maxLength={10}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Lock size={20} color={Colors.textMuted} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={Colors.textMuted}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.button, (phone.length < 10 || password.length < 1 || loading) && styles.buttonDisabled]}
                                onPress={isRegister ? handleRegister : handleLogin}
                                disabled={phone.length < 10 || password.length < 1 || loading}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={Colors.gradientPrimary}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    <Shield size={20} color="#fff" />
                                    <Text style={styles.buttonText}>
                                        {loading ? 'Please wait...' : (isRegister ? 'Create Account' : 'Login')}
                                    </Text>
                                    <ChevronRight size={20} color="#fff" />
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                                <Text style={styles.switchText}>
                                    {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Warning */}
                    <View style={styles.warningBox}>
                        <Shield size={16} color={Colors.amber} />
                        <Text style={styles.warningText}>
                            Protected by National Cyber Command. Your data is encrypted and secure.
                        </Text>
                    </View>

                    {/* Helpline */}
                    <View style={styles.helplineRow}>
                        <Text style={styles.helplineLabel}>National Cybercrime Helpline</Text>
                        <Text style={styles.helplineNumber}>1930</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 48,
    },
    brandingSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    titleGradient: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.blueLight,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: 16,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.emerald,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.emerald,
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 24,
        padding: 28,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 6,
    },
    cardSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        marginBottom: 24,
    },
    inputWrapper: {
        gap: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 56,
    },
    inputIcon: {
        marginRight: 12,
    },
    prefix: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginRight: 8,
        fontWeight: '600',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.textPrimary,
    },
    button: {
        borderRadius: 14,
        overflow: 'hidden',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },
    switchText: {
        color: Colors.blueLight,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
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
        marginBottom: 20,
    },
    warningText: {
        flex: 1,
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
    helplineRow: {
        alignItems: 'center',
        gap: 4,
    },
    helplineLabel: {
        fontSize: 12,
        color: Colors.textMuted,
    },
    helplineNumber: {
        fontSize: 22,
        fontWeight: '800',
        color: Colors.textPrimary,
    },
});
