import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesListComponent } from './entries-list.component';

describe('EntriesListComponent', () => {
  let component: EntriesListComponent;
  let fixture: ComponentFixture<EntriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
