import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Send, Bot, User } from 'lucide-react-native';
import { Colors, API_BASE_URL } from '../../constants/Config';

interface Message {
    id: number;
    type: 'bot' | 'user';
    content: string;
    timestamp: string;
}

const initialMessages: Message[] = [
    {
        id: 1,
        type: 'bot',
        content: 'Hello! I\'m your Cyber Safety AI Assistant. Ask me anything about digital fraud, online safety, or report suspicious activity.',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    },
];

const exampleQueries = [
    'How to identify a phishing SMS?',
    'What is a digital arrest scam?',
    'How to verify a police officer?',
    'Tips to stay safe on UPI payments',
];

export default function AssistantScreen() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
    }, [messages, isLoading]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isLoading) return;

        setInput('');
        const userMsg: Message = {
            id: messages.length + 1,
            type: 'user',
            content: text,
            timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const history = messages.map((m) => ({
                role: m.type === 'bot' ? 'assistant' : 'user',
                content: m.content,
            }));
            history.push({ role: 'user', content: text });

            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history }),
            });

            if (!response.ok) throw new Error('Failed to get response');
            const data = await response.json();

            const botMsg: Message = {
                id: messages.length + 2,
                type: 'bot',
                content: data.response,
                timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            const errorMsg: Message = {
                id: messages.length + 2,
                type: 'bot',
                content: "I'm having trouble connecting to the server. Please make sure the backend is running and try again.",
                timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0a0f1e', '#111827']} style={StyleSheet.absoluteFillObject} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.botAvatar}>
                        <Bot size={22} color={Colors.blue} />
                    </View>
                    <View>
                        <Text style={styles.headerTitle}>AI Assistant</Text>
                        <Text style={styles.headerSubtitle}>Cyber safety expert</Text>
                    </View>
                </View>
                <View style={styles.onlineDot} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
                keyboardVerticalOffset={90}
            >
                {/* Messages */}
                <ScrollView
                    ref={scrollRef}
                    style={styles.messages}
                    contentContainerStyle={styles.messagesContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Example Queries (show when only initial message) */}
                    {messages.length <= 1 && (
                        <View style={styles.examplesContainer}>
                            <Text style={styles.examplesTitle}>Try asking:</Text>
                            {exampleQueries.map((query, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.exampleChip}
                                    onPress={() => {
                                        setInput(query);
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.exampleText}>{query}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {messages.map((msg) => (
                        <View
                            key={msg.id}
                            style={[
                                styles.messageBubbleRow,
                                msg.type === 'user' ? styles.userRow : styles.botRow,
                            ]}
                        >
                            {msg.type === 'bot' && (
                                <View style={styles.msgAvatar}>
                                    <Bot size={14} color={Colors.blue} />
                                </View>
                            )}
                            <View
                                style={[
                                    styles.messageBubble,
                                    msg.type === 'user' ? styles.userBubble : styles.botBubble,
                                ]}
                            >
                                <Text style={styles.messageText}>{msg.content}</Text>
                                <Text style={styles.messageTime}>{msg.timestamp}</Text>
                            </View>
                            {msg.type === 'user' && (
                                <View style={styles.msgAvatarUser}>
                                    <User size={14} color={Colors.textPrimary} />
                                </View>
                            )}
                        </View>
                    ))}

                    {isLoading && (
                        <View style={[styles.messageBubbleRow, styles.botRow]}>
                            <View style={styles.msgAvatar}>
                                <Bot size={14} color={Colors.blue} />
                            </View>
                            <View style={[styles.messageBubble, styles.botBubble]}>
                                <View style={styles.typingDots}>
                                    <View style={[styles.dot, { opacity: 0.4 }]} />
                                    <View style={[styles.dot, { opacity: 0.7 }]} />
                                    <View style={[styles.dot, { opacity: 1 }]} />
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>

                {/* Input */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type your question..."
                        placeholderTextColor={Colors.textMuted}
                        onSubmitEditing={handleSend}
                        returnKeyType="send"
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, (!input.trim() || isLoading) && styles.sendBtnDisabled]}
                        onPress={handleSend}
                        disabled={!input.trim() || isLoading}
                        activeOpacity={0.7}
                    >
                        <Send size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    botAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(59,130,246,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.textPrimary,
    },
    headerSubtitle: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: 1,
    },
    onlineDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.emerald,
    },
    messages: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
        paddingBottom: 8,
    },
    examplesContainer: {
        marginBottom: 16,
    },
    examplesTitle: {
        fontSize: 13,
        color: Colors.textMuted,
        marginBottom: 10,
        fontWeight: '600',
    },
    exampleChip: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 8,
    },
    exampleText: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    messageBubbleRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 12,
        gap: 8,
    },
    userRow: {
        justifyContent: 'flex-end',
    },
    botRow: {
        justifyContent: 'flex-start',
    },
    msgAvatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(59,130,246,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    msgAvatarUser: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: Colors.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageBubble: {
        maxWidth: '75%',
        borderRadius: 16,
        padding: 12,
    },
    botBubble: {
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.15)',
        borderBottomLeftRadius: 4,
    },
    userBubble: {
        backgroundColor: 'rgba(59,130,246,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.25)',
        borderBottomRightRadius: 4,
    },
    messageText: {
        fontSize: 14,
        color: Colors.textPrimary,
        lineHeight: 20,
    },
    messageTime: {
        fontSize: 10,
        color: Colors.textMuted,
        marginTop: 6,
        textAlign: 'right',
    },
    typingDots: {
        flexDirection: 'row',
        gap: 5,
        paddingVertical: 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.blue,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        gap: 10,
    },
    input: {
        flex: 1,
        backgroundColor: Colors.card,
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.2)',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: Colors.textPrimary,
    },
    sendBtn: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendBtnDisabled: {
        opacity: 0.4,
    },
});
