import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSubmit, setAutoSubmit] = useState(false);

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    Alert.alert('Dark Mode', 'Dark mode will be available in a future update!');
  };

  const handleAutoSubmitToggle = () => {
    setAutoSubmit(!autoSubmit);
  };

  const handleAbout = () => {
    Alert.alert(
      'About Quiz Master',
      'Quiz Master v1.0.0\n\nTest your knowledge with fun and challenging quizzes across various categories.\n\nDeveloped with ❤️ using React Native & Expo',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      'Privacy Policy',
      'Your privacy is important to us. We do not collect or store any personal information without your consent.',
      [{ text: 'OK' }]
    );
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all your quiz progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Your progress has been reset.');
          },
        },
      ]
    );
  };

  const SettingItem = ({ title, description, rightComponent, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      {rightComponent && <View style={styles.settingRight}>{rightComponent}</View>}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* App Preferences */}
        <SectionHeader title="App Preferences" />
        
        <SettingItem
          title="Push Notifications"
          description="Receive notifications about new quizzes and challenges"
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: '#D1D5DB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          }
        />

        <SettingItem
          title="Sound Effects"
          description="Play sounds for correct and incorrect answers"
          rightComponent={
            <Switch
              value={soundEnabled}
              onValueChange={handleSoundToggle}
              trackColor={{ false: '#D1D5DB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          }
        />

        <SettingItem
          title="Dark Mode"
          description="Switch to dark theme"
          rightComponent={
            <Switch
              value={darkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: '#D1D5DB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          }
        />

        {/* Quiz Settings */}
        <SectionHeader title="Quiz Settings" />
        
        <SettingItem
          title="Auto Submit"
          description="Automatically submit answers when time runs out"
          rightComponent={
            <Switch
              value={autoSubmit}
              onValueChange={handleAutoSubmitToggle}
              trackColor={{ false: '#D1D5DB', true: '#007AFF' }}
              thumbColor="#FFFFFF"
            />
          }
        />

        <SettingItem
          title="Quiz Difficulty"
          description="Easy"
          rightComponent={
            <Text style={styles.settingValue}>Easy</Text>
          }
          onPress={() => Alert.alert('Coming Soon', 'Difficulty settings will be available soon!')}
        />

        <SettingItem
          title="Default Category"
          description="General Knowledge"
          rightComponent={
            <Text style={styles.settingValue}>General</Text>
          }
          onPress={() => Alert.alert('Coming Soon', 'Category preferences will be available soon!')}
        />

        {/* Account & Data */}
        <SectionHeader title="Account & Data" />
        
        <SettingItem
          title="Reset Progress"
          description="Clear all quiz history and statistics"
          onPress={handleReset}
        />

        <SettingItem
          title="Export Data"
          description="Export your quiz data and statistics"
          onPress={() => Alert.alert('Coming Soon', 'Data export will be available soon!')}
        />

        {/* About */}
        <SectionHeader title="About" />
        
        <SettingItem
          title="Privacy Policy"
          onPress={handlePrivacy}
        />

        <SettingItem
          title="Terms of Service"
          onPress={() => Alert.alert('Coming Soon', 'Terms of service will be available soon!')}
        />

        <SettingItem
          title="About Quiz Master"
          onPress={handleAbout}
        />

        <SettingItem
          title="Rate App"
          onPress={() => Alert.alert('Thank You!', 'Rating functionality will be available in the app store version.')}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Quiz Master v1.0.0</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ using React Native</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 25,
    marginBottom: 10,
    marginHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  settingRight: {
    marginLeft: 15,
  },
  settingValue: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#BDC3C7',
  },
});
