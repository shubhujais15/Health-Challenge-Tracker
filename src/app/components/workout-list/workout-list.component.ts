import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService, User } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Weightlifting', 'Other'];
  searchName: string = '';
  filterType: string = '';
  page: number = 1;
  pageSize: number = 5;
  private subscription: Subscription = new Subscription();

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.subscription = this.workoutService.users$.subscribe(users => {
      this.users = users;
      this.applyFilters();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTotalMinutes(user: User): number {
    return user.workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  removeUser(id: number) {
    this.workoutService.removeUser(id);
    this.applyFilters();
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesName = user.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesType = !this.filterType || user.workouts.some(workout => workout.type === this.filterType);
      return matchesName && matchesType;
    });
    this.page = 1; // Reset to the first page
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page * this.pageSize < this.filteredUsers.length) {
      this.page++;
    }
  }
}
