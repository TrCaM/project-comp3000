import { BasicEntry } from './../../models/basic-entry.model';
import { Component, OnInit, Input } from '@angular/core';
import { MinixClientService } from '../../services/minix-client.service';
import { PrettySizeService } from 'angular-pretty-size';

@Component({
  selector: 'app-file-entry',
  templateUrl: './file-entry.component.html',
  styleUrls: ['./file-entry.component.scss']
})
export class FileEntryComponent implements OnInit {

  @Input() entry: BasicEntry;
  imgPath: string;
  sizeString: string;

  constructor(private minixClient: MinixClientService,
              private prettyService: PrettySizeService) { }

  ngOnInit() {
    const basePath = '../../../assets/images/';
    this.imgPath = basePath + (this.entry.isDir ? 'folder.png' : 'file.png');
    this.sizeString = this.prettyService.pretty(this.entry.size);
  }

  onSelect() {
    if (!this.entry.isDir) {
        this.minixClient.fetchFile(this.entry);
    } else {
        this.minixClient.cd(this.entry.url);
    }
  }

}
