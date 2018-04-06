import { MinixClientService } from './../../services/minix-client.service';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-file-toolbar',
  templateUrl: './file-toolbar.component.html',
  styleUrls: ['./file-toolbar.component.scss']
})
export class FileToolbarComponent implements OnInit, OnChanges {
  @Input() dirty: boolean;
  @Output() clearClicked = new EventEmitter();
  @Output() saveClicked = new EventEmitter();

  constructor(private minixClient: MinixClientService) { }

  ngOnInit() {
  }

  ngOnChanges(changes): void {
    console.log('dirty' + this.dirty);
  }

  onSave() {
    this.saveClicked.emit();
  }

  onClear() {
    this.clearClicked.emit();
  }

  onReload() {
    this.minixClient.loadContent();
  }
}
