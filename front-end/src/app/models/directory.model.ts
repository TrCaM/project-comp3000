import { BasicEntry } from './basic-entry.model';

export class Directory extends BasicEntry {

    children: { type: string, url: string }[];
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
