import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrettySizeModule, PrettySizePipe } from 'angular-pretty-size';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { AppComponent } from './app.component';
import { WorkConsoleModule } from './work-console/work-console.module';
import { CoreModule } from './core/core.module';
import { DialogComponent } from './work-console/dialog/dialog.component';
import { FileOpenDialogComponent } from './work-console/dialog/file-open-dialog/file-open-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    WorkConsoleModule
  ],
  entryComponents: [DialogComponent, FileOpenDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
