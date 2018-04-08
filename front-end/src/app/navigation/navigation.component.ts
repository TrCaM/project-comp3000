// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { SSHClientService } from './../services/ssh-client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  directorySubscription: Subscription;
  pathList: string[];

  constructor(private sshClient: SSHClientService) { }

  ngOnInit() {
    this.directorySubscription = this.sshClient.directoryFetched.subscribe(
      () => {
        this.pathList = this.sshClient.pathList;
      }
    );
  }

  onClick(i) {
    const path = i < 0 ? '/' : ('/' + this.pathList.slice(0, i + 1).join('/'));
    this.sshClient.cd(this.sshClient.baseDirUrl + path);
  }

  ngOnDestroy() {
    this.directorySubscription.unsubscribe();
  }

}
