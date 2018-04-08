import { BasicEntry } from './basic-entry.model';

export class File extends BasicEntry {

    content: string;

    constructor(
        name: string,
        url: string,
        isDir: boolean,
        size: number,
        lastModified: Date,
        permissions: number,
        pString: string,
        uid: number) {
        super(name, url, isDir, size, lastModified, permissions, pString, uid);
    }

    static cloneFrom(e: BasicEntry): File {
        return new File(e.name, e.url, e.isDir, e.size, e.lastModified, e.permissions, e.permissionsString, e.uid);
    }
}
