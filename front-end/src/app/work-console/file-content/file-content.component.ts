import * as ace from 'brace';
import '../../../editor-modes';
import 'brace/theme/monokai';
import 'brace/theme/clouds';

import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, AfterContentInit } from '@angular/core';
import { AceEditorComponent } from 'ng2-ace-editor';
import { MatDialog } from '@angular/material/dialog';
import { SSHClientService } from '../../core/services/ssh-client.service';
import { FileOpenDialogComponent } from '../dialog/file-open-dialog/file-open-dialog.component';

@Component({
  selector: 'app-file-content',
  templateUrl: './file-content.component.html',
  styleUrls: ['./file-content.component.scss']
})
export class FileContentComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('editor') editor: AceEditorComponent;
  fileContent: string;
  fileName: string;
  dirty: boolean;
  readOnly: boolean;
  fileOpen: boolean;

  private shouldDirty: boolean;
  fileFetchedSubscription: Subscription;

  constructor(private sshClient: SSHClientService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.setupEditor();
    this.dirty = false;
    this.shouldDirty = true;
    this.fileOpen = false;
    this.readOnly = true;

    this.editor.getEditor().on('input', () => {
      // input is async event, which fires after any change events
      this.dirty = this.shouldDirty;
      if (!this.shouldDirty) {
        this.shouldDirty = true;
      }
    });
  }

  ngAfterContentInit() {
    this.fileFetchedSubscription = this.sshClient.fileContentLoaded.subscribe(this.onFileLoaded.bind(this));
  }

  async onFileLoaded(content: string) {
    const file = this.sshClient.currentFile;
    if (await this.verifyFileContent(content)) {
      this.fileContent = content;
      this.fileName = file.url.replace(this.sshClient.baseContentUrl, '');
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
  }

  verifyFileContent(content: string): boolean | Promise<boolean> {

    function isPossiblyBinary(str) {
      let count = 0;
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127) {
          count++;
        }
      }
      return count >= 100;
    }

    if (isPossiblyBinary(content)) {
      return new Promise<boolean>(resolve => {
        const message = 'The file you choose could be a binary file ' +
          'that changes can result in severe errors. Do you still want to open it?';
        const dialogRef = this.dialog.open(FileOpenDialogComponent, {
          data: { message: message }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    }
    return true;
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
    this.sshClient.saveFileContent(this.fileContent);
    this.editor.getEditor().focus();
    this.dirty = false;
  }

  markClean() {
    this.shouldDirty = false;
  }

  isPossiblyBinary(fileContent: string) {
    let count = 0;
    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent.charCodeAt(i) > 127) {
        count++;
      }
    }
    return count >= 100;
  }

  ngOnDestroy() {

  }

}
