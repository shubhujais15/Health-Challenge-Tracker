import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private usersSubject: BehaviorSubject<User[]>;
  users$ = new BehaviorSubject<User[]>([]).asObservable();

  constructor() {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const initialUsers = savedUsers.length ? savedUsers : [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
      { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }] }
    ];

    this.usersSubject = new BehaviorSubject<User[]>(initialUsers);
    this.users$ = this.usersSubject.asObservable();
    this.updateLocalStorage();
  }

  addWorkoutToUser(username: string, workout: Workout) {
    const currentUsers = this.usersSubject.value;
    const user = currentUsers.find(u => u.name === username);

    if (user) {
      user.workouts.push(workout);
    } else {
      const newUser: User = {
        id: this.getNextUserId(),
        name: username,
        workouts: [workout]
      };
      currentUsers.push(newUser);
    }

    this.usersSubject.next([...currentUsers]);
    this.updateLocalStorage();
  }

  removeUser(id: number) {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.filter(user => user.id !== id);
    this.usersSubject.next(updatedUsers);
    this.updateLocalStorage();
  }

  private getNextUserId(): number {
    const currentUsers = this.usersSubject.value;
    return currentUsers.length ? Math.max(...currentUsers.map(user => user.id)) + 1 : 1;
  }

  private updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.usersSubject.value));
  }
}
