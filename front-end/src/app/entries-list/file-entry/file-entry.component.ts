import { MinixClientService } from './../../services/minix-client.service';
import { BasicEntry } from './../../models/basic-entry.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-entry',
  templateUrl: './file-entry.component.html',
  styleUrls: ['./file-entry.component.scss']
})
export class FileEntryComponent implements OnInit {

  @Input() entry: BasicEntry;
  imgPath: string;

  constructor(private minixClient: MinixClientService) { }

  ngOnInit() {
    const basePath = '../../../assets/images/';
    this.imgPath = basePath + (this.entry.isDir ? 'folder.png' : 'file.png');
  }

  onSelect() {
    if (!this.entry.isDir) {
        console.log('File Selected!');
    } else {
        this.minixClient.cd(this.entry.url);
    }
  }

}
