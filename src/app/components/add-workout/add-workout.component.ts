import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService, Workout } from '../../services/workout.service';

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent {
  username = '';
  workoutType = '';
  customWorkoutType = '';
  workoutMinutes: number | null = null;
  isCustomWorkout = false;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.username && this.workoutMinutes) {
      const workoutType = this.isCustomWorkout ? this.customWorkoutType : this.workoutType;
      if (!workoutType) return;

      const newWorkout: Workout = {
        type: workoutType,
        minutes: this.workoutMinutes
      };

      this.workoutService.addWorkoutToUser(this.username, newWorkout);

      // Reset the form
      this.username = '';
      this.workoutType = '';
      this.customWorkoutType = '';
      this.workoutMinutes = null;
      this.isCustomWorkout = false;
    }
  }

  checkCustomWorkoutType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.isCustomWorkout = selectElement.value === 'Other';
    if (!this.isCustomWorkout) {
      this.customWorkoutType = '';
    }
  }
}
