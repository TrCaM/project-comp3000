// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { MinixClientService } from './../services/minix-client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  directorySubscription: Subscription;
  pathList: string[];

  constructor(private minixClient: MinixClientService) { }

  ngOnInit() {
    this.directorySubscription = this.minixClient.directoryFetched.subscribe(
      () => {
        this.pathList = this.minixClient.pathList;
      }
    );
  }

  onClick(i) {
    const path = i < 0 ? '/' : ('/' + this.pathList.slice(0, i + 1).join('/'));
    this.minixClient.cd(this.minixClient.baseDirUrl + path);
  }

  ngOnDestroy() {
    this.directorySubscription.unsubscribe();
  }

}
