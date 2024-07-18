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

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.workouts$.subscribe(workouts => {
      this.workouts = workouts;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.username.toLowerCase().includes(this.searchName.toLowerCase()) &&
      (!this.filterType || workout.workoutType === this.filterType)
    );
  }

  removeWorkout(userId: number) {
    this.workoutService.removeWorkout(userId);
  }
}
