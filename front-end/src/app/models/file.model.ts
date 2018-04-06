import { BasicEntry } from './basic-entry.model';

export class File extends BasicEntry {

    content: string;

    constructor(
        name: string,
        url: string,
        isDir: boolean,
        size: number,
        lastModified: Date) {
        super(name, url, isDir, size, lastModified);
    }

    static cloneFrom(e: BasicEntry): File {
        return new File(e.name, e.url, e.isDir, e.size, e.lastModified);
    }
}
