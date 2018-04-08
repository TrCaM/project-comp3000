import { SSHClientService } from './../services/ssh-client.service';
import { Connection } from './../models/connection.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit {

  constructor(private sshClient: SSHClientService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const connectionInfo: Connection = form.value;

    this.sshClient.login(connectionInfo)
      .then(
        () => {
          console.log('Logging Successful');
        },
        () => {
          console.log('Loggin Failed');
        }
      );
  }
}
