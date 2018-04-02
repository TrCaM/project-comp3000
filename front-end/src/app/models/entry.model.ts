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
                lastModified: Date) {
        super(name, url, isDir, size, lastModified);
        this.absolutePath = absolutePath;
        this.parentUrl = parentUrl;
    }

}
