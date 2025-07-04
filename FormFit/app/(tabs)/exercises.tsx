import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock, Target, Star, Search, Filter } from 'lucide-react-native';

export default function ExercisesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', name: 'All', color: '#6B7280' },
    { id: 'upper', name: 'Upper Body', color: '#3B82F6' },
    { id: 'lower', name: 'Lower Body', color: '#10B981' },
    { id: 'core', name: 'Core', color: '#F59E0B' },
    { id: 'cardio', name: 'Cardio', color: '#EF4444' },
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ];

  const exercises = [
    {
      id: 1,
      name: 'Squats',
      category: 'lower',
      difficulty: 'beginner',
      duration: '2-3 mins',
      target: 'Quadriceps, Glutes',
      rating: 4.8,
      description: 'Perfect for building lower body strength and improving form.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Stand with feet shoulder-width apart',
        'Lower your body by bending your knees',
        'Keep your chest up and back straight',
        'Push through your heels to return to starting position'
      ]
    },
    {
      id: 2,
      name: 'Push-ups',
      category: 'upper',
      difficulty: 'intermediate',
      duration: '2-4 mins',
      target: 'Chest, Shoulders, Triceps',
      rating: 4.9,
      description: 'Classic upper body exercise for building chest and arm strength.',
      image: 'https://images.pexels.com/photos/7688357/pexels-photo-7688357.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Start in a plank position',
        'Lower your body until chest nearly touches ground',
        'Keep your body in a straight line',
        'Push back up to starting position'
      ]
    },
    {
      id: 3,
      name: 'Planks',
      category: 'core',
      difficulty: 'beginner',
      duration: '1-2 mins',
      target: 'Core, Shoulders',
      rating: 4.7,
      description: 'Excellent for core stability and overall strength.',
      image: 'https://images.pexels.com/photos/7688378/pexels-photo-7688378.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Start in a forearm plank position',
        'Keep your body in a straight line',
        'Engage your core muscles',
        'Hold the position for desired time'
      ]
    },
    {
      id: 4,
      name: 'Lunges',
      category: 'lower',
      difficulty: 'intermediate',
      duration: '3-4 mins',
      target: 'Quadriceps, Glutes, Hamstrings',
      rating: 4.6,
      description: 'Great for building unilateral leg strength and balance.',
      image: 'https://images.pexels.com/photos/7688347/pexels-photo-7688347.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Step forward with one leg',
        'Lower your hips until both knees are at 90 degrees',
        'Keep your front knee over your ankle',
        'Push back to starting position'
      ]
    },
    {
      id: 5,
      name: 'Burpees',
      category: 'cardio',
      difficulty: 'advanced',
      duration: '3-5 mins',
      target: 'Full Body, Cardio',
      rating: 4.5,
      description: 'High-intensity full-body exercise for cardiovascular fitness.',
      image: 'https://images.pexels.com/photos/7688322/pexels-photo-7688322.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Start standing, then squat down',
        'Jump back into plank position',
        'Do a push-up, then jump feet back to squat',
        'Jump up with arms overhead'
      ]
    },
    {
      id: 6,
      name: 'Mountain Climbers',
      category: 'cardio',
      difficulty: 'intermediate',
      duration: '2-3 mins',
      target: 'Core, Cardio',
      rating: 4.4,
      description: 'Dynamic exercise combining cardio and core strengthening.',
      image: 'https://images.pexels.com/photos/7688326/pexels-photo-7688326.jpeg?auto=compress&cs=tinysrgb&w=400',
      instructions: [
        'Start in a plank position',
        'Bring one knee to your chest',
        'Quickly switch legs',
        'Keep your core engaged throughout'
      ]
    }
  ];

  const filteredExercises = exercises.filter(exercise => {
    const categoryMatch = selectedCategory === 'all' || exercise.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.header}
      >
        <Text style={styles.title}>Exercise Library</Text>
        <Text style={styles.subtitle}>Master your form with AI guidance</Text>
      </LinearGradient>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search exercises...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.categoryButtonTextActive
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Difficulty Filter */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Difficulty</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.difficultyScroll}>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty.id}
              style={[
                styles.difficultyButton,
                selectedDifficulty === difficulty.id && styles.difficultyButtonActive
              ]}
              onPress={() => setSelectedDifficulty(difficulty.id)}
            >
              <Text style={[
                styles.difficultyButtonText,
                selectedDifficulty === difficulty.id && styles.difficultyButtonTextActive
              ]}>
                {difficulty.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Exercise List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {filteredExercises.length} Exercise{filteredExercises.length !== 1 ? 's' : ''}
        </Text>
        
        {filteredExercises.map((exercise) => (
          <TouchableOpacity key={exercise.id} style={styles.exerciseCard}>
            <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
            
            <View style={styles.exerciseContent}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.rating}>{exercise.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.exerciseDescription}>{exercise.description}</Text>
              
              <View style={styles.exerciseDetails}>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#9CA3AF" />
                  <Text style={styles.detailText}>{exercise.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Target size={16} color="#9CA3AF" />
                  <Text style={styles.detailText}>{exercise.target}</Text>
                </View>
              </View>
              
              <View style={styles.exerciseFooter}>
                <View style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(exercise.difficulty) }
                ]}>
                  <Text style={styles.difficultyText}>
                    {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                  </Text>
                </View>
                
                <TouchableOpacity style={styles.startButton}>
                  <LinearGradient
                    colors={['#3B82F6', '#2563EB']}
                    style={styles.startButtonGradient}
                  >
                    <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                    <Text style={styles.startButtonText}>Start</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
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
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  searchPlaceholder: {
    color: '#9CA3AF',
    fontSize: 16,
    marginLeft: 12,
  },
  filterButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  categoryScroll: {
    marginHorizontal: -10,
  },
  categoryButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#374151',
  },
  categoryButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  difficultyScroll: {
    marginHorizontal: -10,
  },
  difficultyButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#374151',
  },
  difficultyButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  difficultyButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
  },
  difficultyButtonTextActive: {
    color: '#FFFFFF',
  },
  exerciseCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
  },
  exerciseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  exerciseContent: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
    marginBottom: 12,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  startButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});