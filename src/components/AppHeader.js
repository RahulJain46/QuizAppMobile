import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function AppHeader() {
  return (
    <SafeAreaView style={styles.headerContainer}>
      {/* Golden Notice Banner */}
      <View style={styles.noticeBanner}>
        <Text style={styles.noticeText}>
          "प्रच्छना स्वाध्याय" NEW QUIZ WILL BE UPLOADED DAILY BY 12:01 AM
        </Text>
      </View>

      {/* Main Header */}
      <View style={styles.header}>
        <Text style={styles.title}>JINDARSHAN</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#234f64',
  },
  noticeBanner: {
    backgroundColor: '#ac7818',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  noticeText: {
    color: '#e9ecef',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 18,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#234f64',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fafafa',
    textAlign: 'center',
  },
});
