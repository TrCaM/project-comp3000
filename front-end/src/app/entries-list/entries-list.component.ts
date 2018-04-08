import { Directory } from './../models/directory.model';
import { BasicEntry } from './../models/basic-entry.model';
import { SSHClientService } from './../services/ssh-client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.scss']
})
export class EntriesListComponent implements OnInit, OnDestroy {
  directorySubcription: Subscription;
  entryList: BasicEntry[];

  constructor(private sshClient: SSHClientService) { }

  ngOnInit() {
    this.sshClient.directoryFetched.subscribe(this.onDirectoryFetched.bind(this));
  }

  onDirectoryFetched() {
    this.entryList = this.sshClient.entries;
  }

  ngOnDestroy() {
    this.directorySubcription.unsubscribe();
  }

}
