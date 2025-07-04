import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, RotateCcw, Play, Pause, Square, Target, Zap } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function WorkoutScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState('squats');
  const [repCount, setRepCount] = useState(0);
  const [formAccuracy, setFormAccuracy] = useState(0);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const exercises = [
    { id: 'squats', name: 'Squats', target: 20 },
    { id: 'pushups', name: 'Push-ups', target: 15 },
    { id: 'planks', name: 'Planks', target: 30 },
    { id: 'lunges', name: 'Lunges', target: 16 },
  ];

  const currentExerciseData = exercises.find(ex => ex.id === currentExercise);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setWorkoutTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  // Simulate AI analysis
  useEffect(() => {
    let analysisInterval: NodeJS.Timeout;
    if (isWorkoutActive && isAnalyzing) {
      analysisInterval = setInterval(() => {
        // Simulate rep detection
        const shouldCount = Math.random() > 0.85;
        if (shouldCount) {
          setRepCount(prev => prev + 1);
          // Simulate form accuracy
          setFormAccuracy(Math.floor(Math.random() * 20) + 80);
        }
      }, 2000);
    }
    return () => clearInterval(analysisInterval);
  }, [isWorkoutActive, isAnalyzing]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Loading camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#1F2937', '#111827']} style={styles.permissionContainer}>
          <Camera size={64} color="#3B82F6" />
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionText}>
            FormFit needs camera access to analyze your workout form and count repetitions accurately.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startWorkout = () => {
    setIsWorkoutActive(true);
    setIsAnalyzing(true);
    setWorkoutTimer(0);
    setRepCount(0);
    setFormAccuracy(0);
  };

  const pauseWorkout = () => {
    setIsWorkoutActive(!isWorkoutActive);
    setIsAnalyzing(!isAnalyzing);
  };

  const stopWorkout = () => {
    setIsWorkoutActive(false);
    setIsAnalyzing(false);
    Alert.alert(
      'Workout Complete!',
      `Great job! You completed ${repCount} ${currentExerciseData?.name.toLowerCase()} with ${formAccuracy}% average form accuracy.`,
      [{ text: 'OK', onPress: () => {
        setRepCount(0);
        setFormAccuracy(0);
        setWorkoutTimer(0);
      }}]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        {/* Header Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.headerOverlay}
        >
          <View style={styles.headerContent}>
            <Text style={styles.exerciseTitle}>{currentExerciseData?.name}</Text>
            <Text style={styles.timer}>{formatTime(workoutTimer)}</Text>
          </View>
        </LinearGradient>

        {/* Exercise Selection */}
        <View style={styles.exerciseSelector}>
          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseButton,
                currentExercise === exercise.id && styles.exerciseButtonActive
              ]}
              onPress={() => setCurrentExercise(exercise.id)}
            >
              <Text style={[
                styles.exerciseButtonText,
                currentExercise === exercise.id && styles.exerciseButtonTextActive
              ]}>
                {exercise.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Analysis Overlay */}
        {isAnalyzing && (
          <View style={styles.aiOverlay}>
            <View style={styles.posePoints}>
              {/* Simulated pose detection points */}
              <View style={[styles.posePoint, { top: '30%', left: '45%' }]} />
              <View style={[styles.posePoint, { top: '40%', left: '35%' }]} />
              <View style={[styles.posePoint, { top: '40%', left: '55%' }]} />
              <View style={[styles.posePoint, { top: '60%', left: '40%' }]} />
              <View style={[styles.posePoint, { top: '60%', left: '50%' }]} />
            </View>
          </View>
        )}

        {/* Stats Overlay */}
        <View style={styles.statsOverlay}>
          <View style={styles.statBox}>
            <Target size={20} color="#3B82F6" />
            <Text style={styles.statValue}>{repCount}</Text>
            <Text style={styles.statLabel}>Reps</Text>
          </View>
          <View style={styles.statBox}>
            <Zap size={20} color="#10B981" />
            <Text style={styles.statValue}>{formAccuracy}%</Text>
            <Text style={styles.statLabel}>Form</Text>
          </View>
        </View>

        {/* Controls */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.controlsOverlay}
        >
          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
              <RotateCcw size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {!isWorkoutActive ? (
              <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  style={styles.startButtonGradient}
                >
                  <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.activeControls}>
                <TouchableOpacity style={styles.controlButton} onPress={pauseWorkout}>
                  {isAnalyzing ? (
                    <Pause size={24} color="#FFFFFF" />
                  ) : (
                    <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.stopButton} onPress={stopWorkout}>
                  <Square size={24} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.controlSpacer} />
          </View>
        </LinearGradient>

        {/* Form Feedback */}
        {isAnalyzing && formAccuracy > 0 && (
          <View style={styles.feedbackContainer}>
            <LinearGradient
              colors={formAccuracy > 80 ? ['#10B981', '#059669'] : ['#F59E0B', '#D97706']}
              style={styles.feedbackGradient}
            >
              <Text style={styles.feedbackText}>
                {formAccuracy > 90 ? 'Perfect Form!' : 
                 formAccuracy > 80 ? 'Good Form' : 
                 formAccuracy > 70 ? 'Adjust Posture' : 'Check Form'}
              </Text>
            </LinearGradient>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 16,
  },
  permissionText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timer: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'monospace',
  },
  exerciseSelector: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  exerciseButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  exerciseButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseButtonTextActive: {
    color: '#FFFFFF',
  },
  aiOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  posePoints: {
    flex: 1,
    position: 'relative',
  },
  posePoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statsOverlay: {
    position: 'absolute',
    top: 200,
    right: 20,
    flexDirection: 'column',
    gap: 12,
  },
  statBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  controlButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  startButton: {
    borderRadius: 35,
    overflow: 'hidden',
  },
  startButtonGradient: {
    padding: 20,
    borderRadius: 35,
  },
  activeControls: {
    flexDirection: 'row',
    gap: 20,
  },
  stopButton: {
    backgroundColor: '#EF4444',
    borderRadius: 25,
    padding: 15,
  },
  controlSpacer: {
    width: 50,
  },
  feedbackContainer: {
    position: 'absolute',
    bottom: 180,
    left: 20,
    right: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  feedbackGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});