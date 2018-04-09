import { LoginPageComponent } from './login-page/login-page.component';
import { SSHClientService } from './services/ssh-client.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
      LoginPageComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
      LoginPageComponent,
      AppRoutingModule
  ],
  providers: [
      SSHClientService
  ]
})
export class CoreModule {}

