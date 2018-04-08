import { LoginPageComponent } from './login-page/login-page.component';
import { SSHClientService } from './services/ssh-client.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
      LoginPageComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
      LoginPageComponent
  ],
  providers: [
      SSHClientService
  ]
})
export class CoreModule {}

