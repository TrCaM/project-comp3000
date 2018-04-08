import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOpenDialogComponent } from './file-open-dialog.component';

describe('FileOpenDialogComponent', () => {
  let component: FileOpenDialogComponent;
  let fixture: ComponentFixture<FileOpenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileOpenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOpenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
