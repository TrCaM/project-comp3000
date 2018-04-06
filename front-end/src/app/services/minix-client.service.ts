import { File } from './../models/file.model';
import { FileContentComponent } from './../file-content/file-content.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { Directory } from './../models/directory.model';
import { Entry } from '../models/entry.model';
import { BasicEntry } from '../models/basic-entry.model';
import { Subject } from 'rxjs/Subject';
import { last } from 'rxjs/operators';

@Injectable()
export class MinixClientService {
  directoryFetched = new Subject();
  fileContentLoaded = new Subject<string>();

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

  fetchFile(entry: BasicEntry) {
    this._openedFile = File.cloneFrom(entry);
    this.loadContent();
  }

  loadContent() {
    const service = this;
    this.http.get(this._openedFile.url, { responseType: 'blob' })
      .subscribe(
        (blob: Blob) => {
          const event = this.fileContentLoaded;
          const reader = new FileReader();
          reader.onload = function () {
            service._openedFile.content = reader.result;
            event.next(reader.result);
          };
          reader.readAsText(blob);
        }
      );
  }

  saveFileContent(fileContent: string) {
    console.log('here');
    // Prepare the blob of file
    const blob = new Blob([fileContent], {type: 'application/octet-stream'});
    // Prepare form data object
    const formData = new FormData();
    formData.append('file', blob, this._openedFile.name);
    // Prepare header
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http.put(this._openedFile.url, formData, {headers: headers})
      .subscribe(
        (message) => {
          console.log(message);
        }
     );
  }

  extractChildren(directory: Directory): BasicEntry[] {
    return directory.children
      .filter(({ url }) => url.charAt(url.length - 1) !== '.')
      .map(this.toEntry);
  }

  toEntry({ size, type, url, lastModified }: { size: number, type: string, url: string, lastModified: number }): BasicEntry {
    const name = url.replace(/^.*[\\\/]/, '');
    const isDir = type === 'directory' ? true : false;

    const lastMDate = new Date(lastModified);
    return new BasicEntry(name, url, isDir, size, lastMDate);
  }

  get currentDir() {
    return { ...this._currentDir };
  }

  get entries() {
    return [...this._entries];
  }

  get currentFile() {
    return {...this._openedFile};
  }

  get pathList(): string[] {
    return this._currentDir.absolutePath.split('/').filter(seg => seg.length !== 0);
  }
}
