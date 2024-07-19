import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WorkoutService, User, Workout } from '../../services/workout.service';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-progress',
  templateUrl: './workout-progress.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WorkoutProgressComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  users: User[] = [];
  selectedUser: User | null = null;
  chartInstance: Chart | null = null;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.users$.subscribe(users => {
      this.users = users;
      if (this.users.length > 0) {
        this.selectedUser = this.users[0];
        this.updateChartData(); // Update chart data when the user list is initialized
      }
    });
  }

  ngAfterViewInit() {
    this.updateChartData();
  }

  updateChartData() {
    if (!this.barChart || !this.selectedUser) {
      return;
    }

    const userWorkouts = this.selectedUser.workouts;
    const workoutTypes = [...new Set(userWorkouts.map(workout => workout.type))];
    const workoutMinutes = workoutTypes.map(type =>
      userWorkouts.filter(workout => workout.type === type).reduce((total, workout) => total + workout.minutes, 0)
    );

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: workoutTypes,
        datasets: [
          {
            label: 'Workout Minutes',
            data: workoutMinutes,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {},
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
