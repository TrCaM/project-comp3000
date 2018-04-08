import { BasicEntry } from './basic-entry.model';

export class Entry extends BasicEntry {

    absolutePath: string;
    parentUrl: string;

    constructor(
        absolutePath: string,
        url: string,
        name: string,
        parentUrl: string,
        isDir: boolean,
        size: number,
        lastModified: Date,
        permissions: number,
        pString: string,
        uid: number) {
        super(name, url, isDir, size, lastModified, permissions, pString, uid);
        this.absolutePath = absolutePath;
        this.parentUrl = parentUrl;
    }

}
