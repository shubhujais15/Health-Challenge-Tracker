import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  userId: number;
  username: string;
  workoutType: string;
  workoutMinutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutsSubject = new BehaviorSubject<Workout[]>([
    { userId: 1, username: 'User1', workoutType: 'Running', workoutMinutes: 30 },
    { userId: 2, username: 'User2', workoutType: 'Cycling', workoutMinutes: 45 },
    { userId: 3, username: 'User3', workoutType: 'Yoga', workoutMinutes: 60 }
  ]);

  workouts$ = this.workoutsSubject.asObservable();

  private getNextUserId(): number {
    const currentWorkouts = this.workoutsSubject.value;
    const maxUserId = currentWorkouts.length > 0 ? Math.max(...currentWorkouts.map(workout => workout.userId)) : 0;
    return maxUserId + 1;
  }

  addWorkout(workout: Omit<Workout, 'userId'>) {
    const currentWorkouts = this.workoutsSubject.value;
    const newWorkout = { ...workout, userId: this.getNextUserId() };
    this.workoutsSubject.next([...currentWorkouts, newWorkout]);
  }

  removeWorkout(userId: number) {
    const currentWorkouts = this.workoutsSubject.value;
    this.workoutsSubject.next(currentWorkouts.filter(workout => workout.userId !== userId));
  }
}
