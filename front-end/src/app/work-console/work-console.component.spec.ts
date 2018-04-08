import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkConsoleComponent } from './work-console.component';

describe('WorkConsoleComponent', () => {
  let component: WorkConsoleComponent;
  let fixture: ComponentFixture<WorkConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
