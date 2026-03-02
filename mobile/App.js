import { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, BackHandler, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

// ─── CONFIG ───────────────────────────────────────
// Point this to your computer's Wi-Fi IP (not localhost).
// Run `ipconfig` on Windows → look for Wi-Fi IPv4 address.
const WEB_APP_URL = 'http://192.168.0.102:3000/citizen/login';
// ──────────────────────────────────────────────────

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Android back button → WebView back
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => handler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Native header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {canGoBack && (
            <TouchableOpacity onPress={() => webViewRef.current?.goBack()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color="#f1f5f9" />
            </TouchableOpacity>
          )}
          <View style={styles.logo}>
            <Ionicons name="shield-checkmark" size={16} color="#020617" />
          </View>
          <Text style={styles.headerTitle}>CG Police Citizen</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.statusDot} />
          <TouchableOpacity onPress={() => webViewRef.current?.reload()} style={styles.reloadBtn}>
            <Ionicons name="reload" size={18} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* WebView — loads the same citizen portal web pages */}
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_APP_URL }}
        style={styles.webview}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        pullToRefreshEnabled={true}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        allowsFullscreenVideo={true}
      />

      {/* Loading overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingLogo}>
            <Ionicons name="shield-checkmark" size={48} color="#34d399" />
          </View>
          <Text style={styles.loadingTitle}>Citizen Protection Portal</Text>
          <ActivityIndicator size="small" color="#34d399" style={{ marginTop: 16 }} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#0f172a', paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backBtn: { padding: 4 },
  logo: {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: '#34d399', alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#f1f5f9' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34d399' },
  reloadBtn: { padding: 4 },
  webview: { flex: 1, backgroundColor: '#020617' },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#020617', alignItems: 'center', justifyContent: 'center', zIndex: 10,
  },
  loadingLogo: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: 'rgba(52,211,153,0.1)', alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(52,211,153,0.2)',
  },
  loadingTitle: { fontSize: 18, fontWeight: '700', color: '#f1f5f9', marginTop: 16 },
  loadingText: { fontSize: 13, color: '#64748b', marginTop: 8 },
});
