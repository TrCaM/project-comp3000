import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-open-dialog',
  templateUrl: './file-open-dialog.component.html',
  styleUrls: ['./file-open-dialog.component.scss']
})
export class FileOpenDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}

