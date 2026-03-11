import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertTriangle, Send, CheckCircle } from 'lucide-react-native';
import { Colors, API_BASE_URL } from '../../constants/Config';

const fraudTypes = [
    'Digital Arrest Call',
    'Phishing SMS',
    'Fake Website',
    'Investment Scam',
    'UPI/Payment Fraud',
    'Deepfake Video Call',
    'Other',
];

export default function ReportScreen() {
    const [selectedType, setSelectedType] = useState('');
    const [content, setContent] = useState('');
    const [details, setDetails] = useState('');
    const [amount, setAmount] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [refId, setRefId] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!selectedType || !content || !details) {
            Alert.alert('Missing Fields', 'Please fill in all required fields.');
            return;
        }
        setSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/report-fraud`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fraud_type: selectedType,
                    contact_info: content,
                    details: details,
                    amount_lost: parseFloat(amount) || 0,
                    location: 'Mobile App',
                    citizen_id: (global as any).citizenId || 1,
                }),
            });
            const data = await response.json();
            setRefId(data.reference || 'Submitted');
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setSelectedType('');
                setContent('');
                setDetails('');
                setAmount('');
                setRefId('');
            }, 4000);
        } catch (err) {
            Alert.alert('Error', 'Could not submit report. Make sure the backend server is running.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />
                <View style={styles.successContainer}>
                    <View style={styles.successIconBox}>
                        <CheckCircle size={48} color={Colors.emerald} />
                    </View>
                    <Text style={styles.successTitle}>Report Submitted!</Text>
                    <Text style={styles.successDesc}>
                        Your fraud report has been received by our cyber crime team. We'll investigate and take appropriate action.
                    </Text>
                    <Text style={styles.successRef}>
                        Reference ID: {refId}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Report Fraud</Text>
                <Text style={styles.headerSubtitle}>Help us stop cyber criminals by reporting suspicious activity</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Fraud Type */}
                    <Text style={styles.label}>Type of Fraud *</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typesScroll}>
                        {fraudTypes.map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.typeChip,
                                    selectedType === type && styles.typeChipActive,
                                ]}
                                onPress={() => setSelectedType(type)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.typeChipText,
                                        selectedType === type && styles.typeChipTextActive,
                                    ]}
                                >
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Contact Info */}
                    <Text style={styles.label}>Phone / URL / Account Details *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter phone, link, or relevant details"
                        placeholderTextColor={Colors.textMuted}
                        value={content}
                        onChangeText={setContent}
                    />

                    {/* Description */}
                    <Text style={styles.label}>Detailed Description *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Describe what happened..."
                        placeholderTextColor={Colors.textMuted}
                        value={details}
                        onChangeText={setDetails}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                    />

                    {/* Amount */}
                    <Text style={styles.label}>Amount Lost (if any)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="₹ 0"
                        placeholderTextColor={Colors.textMuted}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                    />

                    {/* Submit */}
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={Colors.gradientDanger}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.submitGradient}
                        >
                            <Send size={20} color="#fff" />
                            <Text style={styles.submitText}>Submit Report</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Privacy Notice */}
                    <View style={styles.privacyBox}>
                        <AlertTriangle size={16} color={Colors.blue} />
                        <Text style={styles.privacyText}>
                            All reports are kept confidential. Your information helps our cyber crime unit identify patterns and catch criminals.
                        </Text>
                    </View>

                    <View style={{ height: 20 }} />
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
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.textSecondary,
        marginBottom: 10,
        marginTop: 16,
    },
    typesScroll: {
        marginBottom: 4,
    },
    typeChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        marginRight: 10,
    },
    typeChipActive: {
        backgroundColor: 'rgba(239,68,68,0.15)',
        borderColor: 'rgba(239,68,68,0.4)',
    },
    typeChipText: {
        fontSize: 13,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    typeChipTextActive: {
        color: Colors.red,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    textArea: {
        minHeight: 120,
        paddingTop: 14,
    },
    submitBtn: {
        borderRadius: 14,
        overflow: 'hidden',
        marginTop: 24,
    },
    submitGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    submitText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },
    privacyBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        backgroundColor: 'rgba(59,130,246,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.2)',
        borderRadius: 14,
        padding: 14,
        marginTop: 16,
    },
    privacyText: {
        flex: 1,
        fontSize: 12,
        color: Colors.textSecondary,
        lineHeight: 18,
    },
    successContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    successIconBox: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(16,185,129,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(16,185,129,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.textPrimary,
        marginBottom: 12,
    },
    successDesc: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 16,
    },
    successRef: {
        fontSize: 13,
        color: Colors.textMuted,
    },
});
