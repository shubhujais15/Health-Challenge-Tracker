import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WorkoutService, Workout } from '../../services/workout.service';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-progress',
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WorkoutProgressComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  users: string[] = [];
  selectedUser: string = '';
  chartInstance: Chart | null = null;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.workouts$.subscribe(workouts => {
      this.users = [...new Set(workouts.map(workout => workout.username))];
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
    if (!this.barChart) {
      return;
    }

    this.workoutService.workouts$.subscribe(workouts => {
      const userWorkouts = workouts.filter(workout => workout.username === this.selectedUser);
      const workoutTypes = [...new Set(userWorkouts.map(workout => workout.workoutType))];
      const workoutMinutes = workoutTypes.map(type =>
        userWorkouts
          .filter(workout => workout.workoutType === type)
          .reduce((total, workout) => total + workout.workoutMinutes, 0)
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
    });
  }
}
