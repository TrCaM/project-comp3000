import { AceEditorModule } from 'ng2-ace-editor';
import { FileToolbarComponent } from './file-content/file-toolbar/file-toolbar.component';
import { FileEntryComponent } from './entries-list/file-entry/file-entry.component';
import { FileContentComponent } from './file-content/file-content.component';
import { WorkConsoleComponent } from './work-console.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DialogComponent } from './dialog/dialog.component';
import { FileOpenDialogComponent } from './dialog/file-open-dialog/file-open-dialog.component';

@NgModule({
  declarations: [
      WorkConsoleComponent,
      EntriesListComponent,
      FileContentComponent,
      NavigationComponent,
      FileEntryComponent,
      FileToolbarComponent,
      DialogComponent,
      FileOpenDialogComponent
  ],
  imports: [
    CommonModule,
    AceEditorModule,
    SharedModule,
  ],
  entryComponents: [DialogComponent, FileOpenDialogComponent],
  exports: [WorkConsoleComponent, DialogComponent, FileOpenDialogComponent]
})
export class WorkConsoleModule { }

