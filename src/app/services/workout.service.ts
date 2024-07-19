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
  private defaultUsers: User[] = [
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
    { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
    { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }] }
  ];

  private usersSubject: BehaviorSubject<User[]>;
  users$ = new BehaviorSubject<User[]>([]).asObservable();

  constructor() {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const initialUsers = this.ensureDefaultUsers(savedUsers);
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

    this.usersSubject.next(this.sortUsers(currentUsers));
    this.updateLocalStorage();
  }

  removeUser(id: number) {
    const currentUsers = this.usersSubject.value.filter(user => user.id !== id);
    this.usersSubject.next(this.sortUsers(currentUsers));
    this.updateLocalStorage();
  }

  private getNextUserId(): number {
    const currentUsers = this.usersSubject.value;
    const maxDefaultUserId = this.defaultUsers.length;
    const nonDefaultUsers = currentUsers.filter(user => user.id > maxDefaultUserId);
    return nonDefaultUsers.length ? Math.max(...nonDefaultUsers.map(user => user.id)) + 1 : maxDefaultUserId + 1;
  }

  private updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.usersSubject.value));
  }

  private ensureDefaultUsers(users: User[]): User[] {
    const defaultUserNames = this.defaultUsers.map(user => user.name);
    const filteredUsers = users.filter(user => !defaultUserNames.includes(user.name));
    const combinedUsers = [...this.defaultUsers, ...filteredUsers];
    return this.sortUsers(combinedUsers);
  }

  private sortUsers(users: User[]): User[] {
    const defaultUsers = users.filter(user => user.id <= this.defaultUsers.length);
    const nonDefaultUsers = users.filter(user => user.id > this.defaultUsers.length);

    defaultUsers.forEach((user, index) => {
      user.id = index + 1;
    });

    let nextId = this.defaultUsers.length + 1;
    nonDefaultUsers.forEach(user => {
      user.id = nextId++;
    });

    return [...defaultUsers, ...nonDefaultUsers];
  }
}
