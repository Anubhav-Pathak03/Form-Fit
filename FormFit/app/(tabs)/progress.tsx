import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp, Target, Calendar, Award, BarChart3, Activity } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  const weeklyData = [
    { day: 'Mon', reps: 45, form: 92 },
    { day: 'Tue', reps: 38, form: 89 },
    { day: 'Wed', reps: 52, form: 94 },
    { day: 'Thu', reps: 0, form: 0 },
    { day: 'Fri', reps: 61, form: 91 },
    { day: 'Sat', reps: 48, form: 87 },
    { day: 'Sun', reps: 55, form: 93 },
  ];

  const exerciseProgress = [
    { name: 'Squats', completed: 156, target: 200, improvement: '+12%' },
    { name: 'Push-ups', completed: 89, target: 150, improvement: '+8%' },
    { name: 'Planks', completed: 145, target: 180, improvement: '+15%' },
    { name: 'Lunges', completed: 72, target: 120, improvement: '+5%' },
  ];

  const achievements = [
    { title: 'Form Master', description: 'Achieved 95% form accuracy', date: '2 days ago', color: '#3B82F6' },
    { title: 'Consistency King', description: '10 day workout streak', date: '1 week ago', color: '#10B981' },
    { title: 'Rep Warrior', description: 'Completed 500 total reps', date: '2 weeks ago', color: '#F59E0B' },
  ];

  const maxReps = Math.max(...weeklyData.map(d => d.reps));

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.header}
      >
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Track your fitness journey</Text>
      </LinearGradient>

      {/* Overall Stats */}
      <View style={styles.section}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.statGradient}>
              <TrendingUp size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>1,247</Text>
              <Text style={styles.statLabel}>Total Reps</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#10B981', '#059669']} style={styles.statGradient}>
              <Target size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>91%</Text>
              <Text style={styles.statLabel}>Avg Form</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.statGradient}>
              <Calendar size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </LinearGradient>
          </View>
          
          <View style={styles.statCard}>
            <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.statGradient}>
              <Award size={24} color="#FFFFFF" />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      {/* Period Selector */}
      <View style={styles.section}>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.id && styles.periodButtonTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Weekly Chart */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <BarChart3 size={20} color="#3B82F6" />
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
        </View>
        
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {weeklyData.map((data, index) => (
              <View key={index} style={styles.chartColumn}>
                <View style={styles.chartBar}>
                  <View 
                    style={[
                      styles.chartBarFill,
                      { 
                        height: `${(data.reps / maxReps) * 100}%`,
                        backgroundColor: data.reps > 0 ? '#3B82F6' : '#374151'
                      }
                    ]}
                  />
                </View>
                <Text style={styles.chartLabel}>{data.day}</Text>
                <Text style={styles.chartValue}>{data.reps}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Exercise Progress */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Activity size={20} color="#10B981" />
          <Text style={styles.sectionTitle}>Exercise Progress</Text>
        </View>
        
        {exerciseProgress.map((exercise, index) => (
          <View key={index} style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.improvementBadge}>{exercise.improvement}</Text>
            </View>
            
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                {exercise.completed} / {exercise.target}
              </Text>
              <Text style={styles.progressPercentage}>
                {Math.round((exercise.completed / exercise.target) * 100)}%
              </Text>
            </View>
            
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressBarFill,
                  { width: `${(exercise.completed / exercise.target) * 100}%` }
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Recent Achievements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Award size={20} color="#F59E0B" />
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
        </View>
        
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
              <Award size={16} color="#FFFFFF" />
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
          </View>
        ))}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#3B82F6',
  },
  periodButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  chartContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
  },
  chartBar: {
    width: 20,
    height: 100,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  chartBarFill: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  chartValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  improvementBadge: {
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  achievementCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#6B7280',
  },
});