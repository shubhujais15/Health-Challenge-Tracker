import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService, Workout } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  searchName = '';
  filterType = '';
  page = 1;
  pageSize = 5;
  totalPages = 1;  // Initialize totalPages

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.workouts$.subscribe(workouts => {
      this.workouts = workouts;
      this.applyFilters();
    });
  }

  applyFilters() {
    // Filter workouts based on searchName and filterType
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.username.toLowerCase().includes(this.searchName.toLowerCase()) &&
      (!this.filterType || workout.workoutType === this.filterType)
    );

    // Update total pages based on filtered workouts
    this.totalPages = Math.ceil(this.filteredWorkouts.length / this.pageSize);
  }

  removeWorkout(userId: number) {
    this.workoutService.removeWorkout(userId);
    this.applyFilters(); // Reapply filters after removing a workout
  }

  // Methods to handle page navigation
  previousPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }
}
