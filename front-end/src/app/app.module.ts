import { SharedModule } from './shared/shared.module';
import { MinixClientService } from './services/minix-client.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrettySizeModule, PrettySizePipe } from 'angular-pretty-size';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { FileContentComponent } from './file-content/file-content.component';
import { FileEntryComponent } from './entries-list/file-entry/file-entry.component';
import { AceEditorModule } from 'ng2-ace-editor';
import { FileToolbarComponent } from './file-content/file-toolbar/file-toolbar.component';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EntriesListComponent,
    FileContentComponent,
    FileEntryComponent,
    FileToolbarComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SplitPaneModule,
    AceEditorModule,
    SharedModule,
    NgbModule.forRoot(),
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    MinixClientService
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
