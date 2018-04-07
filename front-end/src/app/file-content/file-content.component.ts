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
  fileName: string;
  dirty: boolean;
  readOnly: boolean;
  fileOpen: boolean;

  private shouldDirty: boolean;
  fileFetchedSubscription: Subscription;

  constructor(private minixClient: MinixClientService) { }

  ngOnInit() {
    this.setupEditor();
    this.dirty = false;
    this.shouldDirty = true;
    this.fileOpen = false;
    this.readOnly = true;

    this.fileFetchedSubscription = this.minixClient.fileContentLoaded.subscribe(
      (content) => {
        const file = this.minixClient.currentFile;
        this.fileContent = content;
        this.fileName = file.url.replace(this.minixClient.baseContentUrl, '');
        this.fileOpen = true;
        this.editor.getEditor().focus();
        this.markClean();
        // tslint:disable-next-line:no-bitwise
        if (((file.permissions & 0o200) !== 0)) {
          this.readOnly = false;
          this.editor.getEditor().setReadOnly(false);
        } else {
          this.editor.getEditor().setReadOnly(true);
          this.readOnly = true;
        }
      }
    );

    this.editor.getEditor().on('input', () =>  {
      // input is async event, which fires after any change events
      this.dirty = this.shouldDirty;
      if (!this.shouldDirty) {
        this.shouldDirty = true;
      }
    });
  }

  setupEditor() {
    this.editor.setTheme('clouds');

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });

    this.editor.setMode('c_cpp');

  }

  clearEditor() {
    if (this.fileContent.length !== 0) {
       this.dirty = true;
    }
    this.fileContent = '';
    this.editor.getEditor().focus();
  }

  saveFile() {
    this.minixClient.saveFileContent(this.fileContent);
    this.editor.getEditor().focus();
    this.dirty = false;
  }

  markClean() {
    this.shouldDirty = false;
  }

  ngOnDestroy() {

  }

}
