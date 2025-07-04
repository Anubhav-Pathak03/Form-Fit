export interface WorkoutSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  exerciseType: string;
  totalReps: number;
  averageForm: number;
  duration: number;
  calories?: number;
}

export interface ExerciseDefinition {
  id: string;
  name: string;
  category: 'upper' | 'lower' | 'core' | 'cardio';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  instructions: string[];
  description: string;
  estimatedDuration: number;
  caloriesPerMinute: number;
}

export interface UserProgress {
  totalWorkouts: number;
  totalReps: number;
  averageFormAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  weeklyStats: WeeklyStats[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'reps' | 'form' | 'streak' | 'workout';
}

export interface WeeklyStats {
  week: string;
  totalReps: number;
  averageForm: number;
  workoutCount: number;
  totalDuration: number;
}

export interface FormFeedback {
  type: 'excellent' | 'good' | 'fair' | 'poor';
  message: string;
  suggestions: string[];
  confidence: number;
}