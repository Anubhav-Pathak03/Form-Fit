import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Award, Target, Calendar, Zap, TrendingUp } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [weeklyWorkouts, setWeeklyWorkouts] = useState(4);
  const [totalReps, setTotalReps] = useState(1247);
  const [perfectForms, setPerfectForms] = useState(89);

  const quickWorkouts = [
    { id: 1, name: 'Quick HIIT', duration: '15 min', exercises: 'Push-ups, Squats, Planks' },
    { id: 2, name: 'Strength Builder', duration: '20 min', exercises: 'Squats, Lunges, Burpees' },
    { id: 3, name: 'Core Blast', duration: '10 min', exercises: 'Planks, Crunches, Mountain Climbers' },
  ];

  const achievements = [
    { id: 1, title: 'Week Warrior', description: '7 day streak!', icon: '🔥' },
    { id: 2, title: 'Form Master', description: '90% perfect form', icon: '🎯' },
    { id: 3, title: 'Rep Counter', description: '1000+ reps', icon: '💪' },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning!</Text>
          <Text style={styles.userName}>Ready to crush your workout?</Text>
        </View>
      </LinearGradient>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Calendar size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statNumber}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Zap size={24} color="#10B981" />
            </View>
            <Text style={styles.statNumber}>{weeklyWorkouts}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Target size={24} color="#F59E0B" />
            </View>
            <Text style={styles.statNumber}>{totalReps}</Text>
            <Text style={styles.statLabel}>Total Reps</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Award size={24} color="#EF4444" />
            </View>
            <Text style={styles.statNumber}>{perfectForms}%</Text>
            <Text style={styles.statLabel}>Perfect Form</Text>
          </View>
        </View>
      </View>

      {/* Quick Start Workouts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Start</Text>
        {quickWorkouts.map((workout) => (
          <TouchableOpacity key={workout.id} style={styles.workoutCard}>
            <LinearGradient
              colors={['#3B82F6', '#2563EB']}
              style={styles.workoutGradient}
            >
              <View style={styles.workoutContent}>
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <Text style={styles.workoutDuration}>{workout.duration}</Text>
                  <Text style={styles.workoutExercises}>{workout.exercises}</Text>
                </View>
                <View style={styles.playButton}>
                  <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll}>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Today's Goal */}
      <View style={styles.section}>
        <View style={styles.goalCard}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.goalGradient}
          >
            <View style={styles.goalContent}>
              <TrendingUp size={32} color="#FFFFFF" />
              <Text style={styles.goalText}>Today's Goal: 50 Perfect Reps</Text>
              <Text style={styles.goalProgress}>32/50 completed</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '64%' }]} />
              </View>
            </View>
          </LinearGradient>
        </View>
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
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  statsContainer: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1F2937',
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  statIcon: {
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  workoutCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  workoutGradient: {
    padding: 20,
  },
  workoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#BFDBFE',
    marginBottom: 4,
  },
  workoutExercises: {
    fontSize: 12,
    color: '#93C5FD',
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 15,
  },
  achievementsScroll: {
    marginHorizontal: -10,
  },
  achievementCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    width: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  goalCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  goalGradient: {
    padding: 24,
  },
  goalContent: {
    alignItems: 'center',
  },
  goalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 8,
  },
  goalProgress: {
    fontSize: 14,
    color: '#D1FAE5',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
});