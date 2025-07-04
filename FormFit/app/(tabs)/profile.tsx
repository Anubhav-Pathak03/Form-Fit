import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut,
  Camera,
  Target,
  Activity,
  Award,
  ChevronRight,
  Moon
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [voiceCoachingEnabled, setVoiceCoachingEnabled] = useState(true);

  const userStats = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    joinDate: 'January 2024',
    totalWorkouts: 47,
    perfectForms: 1247,
    currentStreak: 12,
    achievements: 8
  };

  const settingsCategories = [
    {
      title: 'Workout Preferences',
      items: [
        {
          icon: Camera,
          title: 'Camera Position',
          subtitle: 'Adjust camera settings for better tracking',
          action: 'navigate'
        },
        {
          icon: Target,
          title: 'Rep Sensitivity',
          subtitle: 'Fine-tune rep counting accuracy',
          action: 'navigate'
        },
        {
          icon: Activity,
          title: 'Form Strictness',
          subtitle: 'Set form analysis sensitivity level',
          action: 'navigate'
        }
      ]
    },
    {
      title: 'App Settings',
      items: [
        {
          icon: Bell,
          title: 'Notifications',
          subtitle: 'Workout reminders and achievements',
          action: 'toggle',
          value: notificationsEnabled,
          onChange: setNotificationsEnabled
        },
        {
          icon: Moon,
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark themes',
          action: 'toggle',
          value: darkModeEnabled,
          onChange: setDarkModeEnabled
        },
        {
          icon: Settings,
          title: 'Voice Coaching',
          subtitle: 'Real-time audio feedback during workouts',
          action: 'toggle',
          value: voiceCoachingEnabled,
          onChange: setVoiceCoachingEnabled
        }
      ]
    },
    {
      title: 'Support & Info',
      items: [
        {
          icon: HelpCircle,
          title: 'Help & Support',
          subtitle: 'Get help with using FormFit',
          action: 'navigate'
        },
        {
          icon: Shield,
          title: 'Privacy Policy',
          subtitle: 'Learn about your data privacy',
          action: 'navigate'
        },
        {
          icon: LogOut,
          title: 'Sign Out',
          subtitle: 'Sign out of your account',
          action: 'logout'
        }
      ]
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic
            Alert.alert('Signed Out', 'You have been signed out successfully.');
          }
        }
      ]
    );
  };

  const handleItemPress = (item: any) => {
    if (item.action === 'logout') {
      handleLogout();
    } else if (item.action === 'navigate') {
      Alert.alert('Coming Soon', 'This feature will be available in a future update.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={styles.avatar}
            >
              <User size={48} color="#FFFFFF" />
            </LinearGradient>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userStats.name}</Text>
            <Text style={styles.userEmail}>{userStats.email}</Text>
            <Text style={styles.joinDate}>Member since {userStats.joinDate}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Overview */}
      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Activity size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>{userStats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          
          <View style={styles.statCard}>
            <Target size={24} color="#10B981" />
            <Text style={styles.statNumber}>{userStats.perfectForms}</Text>
            <Text style={styles.statLabel}>Perfect Reps</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.statNumber}>{userStats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <Award size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>{userStats.achievements}</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>
      </View>

      {/* Settings */}
      {settingsCategories.map((category, categoryIndex) => (
        <View key={categoryIndex} style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>{category.title}</Text>
          
          <View style={styles.settingsGroup}>
            {category.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.settingItem,
                  itemIndex === category.items.length - 1 && styles.settingItemLast
                ]}
                onPress={() => handleItemPress(item)}
              >
                <View style={styles.settingItemLeft}>
                  <View style={styles.settingIcon}>
                    <item.icon size={20} color="#9CA3AF" />
                  </View>
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                
                <View style={styles.settingItemRight}>
                  {item.action === 'toggle' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onChange}
                      trackColor={{ false: '#374151', true: '#3B82F6' }}
                      thumbColor={item.value ? '#FFFFFF' : '#9CA3AF'}
                    />
                  ) : (
                    <ChevronRight size={20} color="#9CA3AF" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* App Version */}
      <View style={styles.versionSection}>
        <Text style={styles.versionText}>FormFit v1.0.0</Text>
        <Text style={styles.versionSubtext}>
          Built with AI-powered movement analysis
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  statsSection: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: '#1F2937',
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  streakEmoji: {
    fontSize: 24,
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  settingsGroup: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  settingItemRight: {
    marginLeft: 12,
  },
  versionSection: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});