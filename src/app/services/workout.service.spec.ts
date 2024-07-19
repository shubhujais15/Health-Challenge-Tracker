import { TestBed } from '@angular/core/testing';
import { WorkoutService, User, Workout } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should add a workout to an existing user', () => {
    // Arrange
    const username = 'John Doe';
    const workout: Workout = { type: 'Running', minutes: 30 };
    const initialUser: User = { id: 1, name: 'John Doe', workouts: [] };
    service['usersSubject'].next([initialUser]);

    // Act
    service.addWorkoutToUser(username, workout);

    // Assert
    const updatedUser = service['usersSubject'].value.find(user => user.name === username);
    expect(updatedUser).toBeDefined();
    expect(updatedUser?.workouts.length).toBe(1);
    expect(updatedUser?.workouts[0]).toEqual(workout);
  });

  it('should add a new user if user does not exist', () => {
    // Arrange
    const username = 'Jane Doe';
    const workout: Workout = { type: 'Cycling', minutes: 45 };
    service['usersSubject'].next([]);

    // Act
    service.addWorkoutToUser(username, workout);

    // Assert
    const newUser = service['usersSubject'].value.find(user => user.name === username);
    expect(newUser).toBeDefined();
    expect(newUser?.workouts.length).toBe(1);
    expect(newUser?.workouts[0]).toEqual(workout);
  });
});
