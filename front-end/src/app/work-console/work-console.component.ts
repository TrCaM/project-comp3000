import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SSHClientService } from '../core/services/ssh-client.service';
import { Status } from '../core/models/status.enum';

@Component({
  selector: 'app-work-console',
  templateUrl: './work-console.component.html',
  styleUrls: ['./work-console.component.scss']
})
export class WorkConsoleComponent implements OnInit {

  constructor(private sshClient: SSHClientService,
              private router: Router) { }

  ngOnInit() {
    if (this.sshClient.connectionStatus === Status.DISCONNECTED) {
      this.router.navigate(['login']);
    }
  }

}
