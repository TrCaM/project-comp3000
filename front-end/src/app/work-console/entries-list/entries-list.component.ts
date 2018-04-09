import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BasicEntry } from '../../core/models/basic-entry.model';
import { SSHClientService } from '../../core/services/ssh-client.service';

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
    if (this.directorySubcription) {
      this.directorySubcription.unsubscribe();
    }
  }

}
