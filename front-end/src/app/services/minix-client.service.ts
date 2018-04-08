import { File } from './../models/file.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import * as checker from 'istextorbinary';

import { Directory } from './../models/directory.model';
import { Entry } from '../models/entry.model';
import { BasicEntry } from '../models/basic-entry.model';
import { Subject } from 'rxjs/Subject';
import { last } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class MinixClientService {
  directoryFetched = new Subject();
  fileContentLoaded = new Subject<string>();
  errorCaught = new Subject<string>();
  fileOpenConfirm = new Subject<string>();

  readonly baseDirUrl = 'http://localhost:8080/minix-web-service/webapi/files';
  readonly baseContentUrl = 'http://localhost:8080/minix-web-service/webapi/content';

  private _currentDir: Directory;
  private _openedFile: File;
  private _entries: BasicEntry[];

  constructor(private http: HttpClient) {
    this.cd(this.baseDirUrl + '/');
  }

  cd(url: string) {
    if (!this._currentDir || url !== this._currentDir.url) {
      this.http.get<Directory>(url, { reportProgress: true })
        .subscribe(
          (directory) => {
            this._currentDir = directory;
            this._entries = this.extractChildren(directory);
            this.directoryFetched.next();
          },
          (error: HttpErrorResponse) => {
            this.inspectError(error.error);
          }
        );
    }
  }

  fetchFile(entry: BasicEntry) {
    this._openedFile = File.cloneFrom(entry);
    this.loadContent();
  }

  loadContent() {
    const service = this;
    this.http.get(this._openedFile.url, { responseType: 'blob' })
      .subscribe(
        (blob: Blob) => {
          const reader = new FileReader();
          reader.onload =  () => {
            service._openedFile.content = reader.result;
            this.fileContentLoaded.next(reader.result);
          };
          reader.readAsText(blob);
        },
        (error: HttpErrorResponse) => {
          this.inspectError(error.error);
        }
      );


  }

  saveFileContent(fileContent: string) {
    // Prepare the blob of file
    const blob = new Blob([fileContent], { type: 'application/octet-stream' });
    // Prepare form data object
    const formData = new FormData();
    formData.append('file', blob, this._openedFile.name);
    // Prepare header
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http.put(this._openedFile.url, formData, { headers: headers })
      .subscribe(
        (message) => {
          console.log(message);
        },
        (error: HttpErrorResponse) => {
          this.inspectError(error.error);
        }
      );
  }

  private inspectError(error: { message: string }) {
    this.errorCaught.next(error.message);
  }

  extractChildren(directory: Directory): BasicEntry[] {
    return directory.children
      .filter(({ url }) => url.charAt(url.length - 1) !== '.')
      .map(this.toEntry);
  }

  toEntry({ size, type, url, lastModified, permissions, permissionsString, uid }): BasicEntry {
    const name = url.replace(/^.*[\\\/]/, '');
    const isDir = type === 'directory' ? true : false;

    const lastMDate = new Date(lastModified);
    return new BasicEntry(name, url, isDir, size, lastMDate, permissions, permissionsString, uid);
  }

  get currentDir() {
    return { ...this._currentDir };
  }

  get entries() {
    return [...this._entries];
  }

  get currentFile() {
    return { ...this._openedFile };
  }

  get pathList(): string[] {
    return this._currentDir.absolutePath.split('/').filter(seg => seg.length !== 0);
  }
}
