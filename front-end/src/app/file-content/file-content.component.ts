import * as ace from 'brace';
import '../../editor-modes';
import 'brace/theme/monokai';
import 'brace/theme/clouds';

import { Subscription } from 'rxjs/Subscription';
import { MinixClientService } from './../services/minix-client.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.scss']
})
export class FileContentComponent implements OnInit, OnDestroy {
  @ViewChild('editor') editor: AceEditorComponent;
  fileContent: string;
  fileFetchedSubscription: Subscription;

  constructor(private minixClient: MinixClientService) { }

  ngOnInit() {
    this.setupEditor();

    this.fileFetchedSubscription = this.minixClient.fileContentLoaded.subscribe(
      (content) => {
        this.fileContent = content;
      }
    );
  }

  setupEditor() {
    this.editor.setTheme('clouds');

    this.editor.getEditor().setOptions({
        enableBasicAutocompletion: true
    });

    this.editor.setMode('c_cpp');

  }


  ngOnDestroy() {

  }

}
