import { Directory } from './../models/directory.model';
import { BasicEntry } from './../models/basic-entry.model';
import { MinixClientService } from './../services/minix-client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit, OnDestroy {
  directorySubcription: Subscription;
  entryList: BasicEntry[];

  constructor(private minixClient: MinixClientService) { }

  ngOnInit() {
    this.minixClient.directoryFetched.subscribe(this.onDirectoryFetched.bind(this));
  }

  onDirectoryFetched() {
    this.entryList = this.minixClient.entries;
  }

  ngOnDestroy() {
    this.directorySubcription.unsubscribe();
  }

}
