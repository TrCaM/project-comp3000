import { FileContentComponent } from './../file-content/file-content.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { Directory } from './../models/directory.model';
import { Entry } from '../models/entry.model';
import { BasicEntry } from '../models/basic-entry.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MinixClientService {
  directoryFetched = new Subject();
  fileContentLoaded = new Subject<string>();

  readonly baseDirUrl = 'http://localhost:8080/minix-web-service/webapi/files';
  readonly baseContentUrl = 'http://localhost:8080/minix-web-service/webapi/content';

  private _currentDir: Directory;
  private _entries: BasicEntry[];

  constructor(private http: HttpClient) {
    this.cd(this.baseDirUrl + '/');
  }

  cd(url: string) {
    if (!this._currentDir || url !== this._currentDir.url) {
      this.http.get<Directory>(url)
        .subscribe(
          (directory) => {
            this._currentDir = directory;
            this._entries = this.extractChildren(directory);
            this.directoryFetched.next();
          }
        );
    }
  }

  fetchFile(url: string) {
    return this.http.get(url, { responseType: 'blob' })
      .subscribe(
        (blob: Blob) => {
          const event = this.fileContentLoaded;
          const reader = new FileReader();
          reader.onload = function () {
            event.next(reader.result);
          };
          reader.readAsText(blob);
        }
      );
  }

  extractChildren(directory: Directory): BasicEntry[] {
    return directory.children
      .filter(({ url }) => url.charAt(url.length - 1) !== '.')
      .map(this.toEntry);
  }

  toEntry({ type, url }: { type: string, url: string }): BasicEntry {
    const name = url.replace(/^.*[\\\/]/, '');
    const isDir = type === 'directory' ? true : false;
    const size = 100;
    const lastModified = new Date();
    return new BasicEntry(name, url, isDir, size, lastModified);
  }

  get currentDir() {
    return { ...this._currentDir };
  }

  get entries() {
    return [...this._entries];
  }

  get pathList(): string[] {
    return this._currentDir.absolutePath.split('/').filter(seg => seg.length !== 0);
  }
}
