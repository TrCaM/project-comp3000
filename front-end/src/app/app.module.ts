import { CorsInterceptor } from './services/cors.interceptor';
import { MinixClientService } from './services/minix-client.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SplitPaneModule } from 'ng2-split-pane/lib/ng2-split-pane';
import { EntriesListComponent } from './entries-list/entries-list.component';
import { FileContentComponent } from './file-content/file-content.component';
import { FileEntryComponent } from './entries-list/file-entry/file-entry.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EntriesListComponent,
    FileContentComponent,
    FileEntryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SplitPaneModule,
    NgbModule.forRoot()
  ],
  providers: [
    MinixClientService,
    {provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
