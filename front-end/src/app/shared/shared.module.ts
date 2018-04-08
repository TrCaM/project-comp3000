import { PrettySizeModule } from 'angular-pretty-size';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontSizeFixedDirective } from './font-size-fixed.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Translate
@NgModule({
  imports: [
    CommonModule,
    PrettySizeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    CommonModule,
    PrettySizeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [FontSizeFixedDirective]
})

export class SharedModule { }
