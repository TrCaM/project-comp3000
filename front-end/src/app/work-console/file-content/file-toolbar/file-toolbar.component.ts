import { Subject } from 'rxjs/Subject';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { SSHClientService } from '../../../core/services/ssh-client.service';

@Component({
  selector: 'app-file-toolbar',
  templateUrl: './file-toolbar.component.html',
  styleUrls: ['./file-toolbar.component.scss']
})
export class FileToolbarComponent implements OnInit, OnChanges {
  @Input() dirty: boolean;
  @Output() clearClicked = new EventEmitter();
  @Output() saveClicked = new EventEmitter();

  constructor(private sshClient: SSHClientService) { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
  }

  onSave() {
    this.saveClicked.emit();
  }

  onClear() {
    this.clearClicked.emit();
  }

  onReload() {
    this.sshClient.loadContent();
  }
}
