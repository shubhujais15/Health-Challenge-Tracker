import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService, User, Workout } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  searchName = '';
  filterType = '';
  page = 1;
  pageSize = 5;
  totalPages = 1;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Weightlifting'];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.users$.subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  applyFilters() {
    let filteredUsers = this.users;

    if (this.searchName) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }

    if (this.filterType) {
      filteredUsers = filteredUsers.filter(user =>
        user.workouts.some(workout => workout.type === this.filterType)
      );
    }

    this.totalPages = Math.ceil(filteredUsers.length / this.pageSize);
    this.page = 1;
    this.users = filteredUsers;
  }

  removeUser(id: number) {
    this.workoutService.removeUser(id);
  }

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
