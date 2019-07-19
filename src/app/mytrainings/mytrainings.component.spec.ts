import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrainingsComponent } from './mytrainings.component';

describe('TrainingListComponent', () => {
  let component: MyTrainingsComponent;
  let fixture: ComponentFixture<MyTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
