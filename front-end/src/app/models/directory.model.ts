import { Entry } from './entry.model';

export class Directory extends Entry {

    children: {type: string, url: string}[];

    constructor(
        path: string,
        url: string,
        name: string,
        parentUrl: string,
        isDir: boolean,
        size: number,
        lastModified: Date) {
        super(path,  url, name, parentUrl, isDir, size, lastModified);
    }

}
