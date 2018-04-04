import { PrettySizeModule } from 'angular-pretty-size';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Translate
@NgModule({
  imports: [
    CommonModule,
    PrettySizeModule
  ],
  exports: [
    CommonModule,
    PrettySizeModule
  ]
})

export class SharedModule { }
