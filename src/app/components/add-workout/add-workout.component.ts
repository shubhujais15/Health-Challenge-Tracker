import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

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
  workoutMinutes: number | null = null;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.username && this.workoutType && this.workoutMinutes) {
      const newWorkout = {
        username: this.username,
        workoutType: this.workoutType,
        workoutMinutes: this.workoutMinutes
      };
      this.workoutService.addWorkout(newWorkout);

      // Reset the form
      this.username = '';
      this.workoutType = '';
      this.workoutMinutes = null;
    }
  }
}
