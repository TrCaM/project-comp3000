import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { SSHClientService } from './core/services/ssh-client.service';
import { DialogComponent } from './work-console/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  errorObserver: Subscription;

  constructor(private sshClient: SSHClientService,
              private dialog: MatDialog) {
    this.errorObserver = this.sshClient.errorCaught.subscribe(
      (message: string) => {
        this.dialog.open(DialogComponent, {
          width: '70vh',
          height: '35vh',
          data: {message: message}
        });
      }
    );
  }
}
