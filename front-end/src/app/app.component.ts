import { Subscription } from 'rxjs/Subscription';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MinixClientService } from './services/minix-client.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  errorObserver: Subscription;

  constructor(private minixClient: MinixClientService,
              private dialog: MatDialog) {
    this.errorObserver = this.minixClient.errorCaught.subscribe(
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
