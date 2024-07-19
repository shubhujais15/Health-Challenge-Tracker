import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutService } from '../../services/workout.service';
import { of } from 'rxjs';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkoutComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: WorkoutService, useValue: { addWorkoutToUser: jasmine.createSpy() } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should call addWorkoutToUser when form is submitted', () => {
    // Arrange
    component.username = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;
    const workoutServiceSpy = spyOn(workoutService, 'addWorkoutToUser');

    // Act
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    // Assert
    expect(workoutServiceSpy).toHaveBeenCalledWith('John Doe', { type: 'Running', minutes: 30 });
  });
});
