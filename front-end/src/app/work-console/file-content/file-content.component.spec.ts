import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileContentComponent } from './file-content.component';

describe('FileContentComponent', () => {
  let component: FileContentComponent;
  let fixture: ComponentFixture<FileContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
