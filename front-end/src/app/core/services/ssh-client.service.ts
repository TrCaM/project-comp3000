import { Status } from './../models/status.enum';
import { File } from './../models/file.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';

// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import * as checker from 'istextorbinary';

import { Subject } from 'rxjs/Subject';
import { last } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Directory } from '../models/directory.model';
import { BasicEntry } from '../models/basic-entry.model';
import { Connection } from '../models/connection.model';

@Injectable()
export class SSHClientService {
  directoryFetched = new Subject();
  fileContentLoaded = new Subject<string>();
  errorCaught = new Subject();
  fileOpenConfirm = new Subject<string>();

  readonly baseDirUrl = 'http://localhost:8080/minix-web-service/webapi/files';
  readonly baseContentUrl = 'http://localhost:8080/minix-web-service/webapi/content';
  readonly loginUrl = 'http://localhost:8080/minix-web-service/webapi/login';

  private _currentDir: Directory;
  private _openedFile: File;
  private _entries: BasicEntry[];
  private _connectionStatus: Status;

  constructor(private http: HttpClient) {
    this._connectionStatus = Status.DISCONNECTED;
  }

  login(info: Connection) {
    return new Promise((resolve, reject) => {
      const req = new HttpRequest('POST', this.loginUrl, info, { reportProgress: false });
      this.http.request(req).filter(x => x instanceof HttpResponse).subscribe(
          (response: HttpResponse<any>) => {
            console.log(response);
            this._connectionStatus = Status.CONNECTED;
            this.cd(this.baseDirUrl + '/');
            resolve();
          },
          (error: HttpErrorResponse) => {
            this.inspectError(error.error);
          }
      );
    });
  }

  cd(url: string) {
    console.log(url);
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
          reader.onload = () => {
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
    this.errorCaught.next(error);
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

  get connectionStatus(): Status {
    return this._connectionStatus;
  }
}
