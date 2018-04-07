import { PrettySizeModule } from 'angular-pretty-size';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontSizeFixedDirective } from './font-size-fixed.directive';

// Translate
@NgModule({
  imports: [
    CommonModule,
    PrettySizeModule,
  ],
  exports: [
    CommonModule,
    PrettySizeModule
  ],
  declarations: [FontSizeFixedDirective]
})

export class SharedModule { }
