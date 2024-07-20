import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { HomeComponent } from './components/home/home.component';
import { WorkoutProgressComponent } from './components/workout-progress/workout-progress.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'add-workout',
        component: AddWorkoutComponent
    },
    {
        path: 'workout-list',
        component: WorkoutListComponent
    },
    {
        path: 'workout-progress',
        component: WorkoutProgressComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

