export class BasicEntry {
    name: string;
    url: string;
    isDir: boolean;
    size: number;
    lastModified: Date;

    constructor(name: string, url: string, isDir: boolean, size: number, lastModified: Date) {
        this.name = name;
        this.url = url;
        this.isDir = isDir;
        this.size = size;
        this.lastModified = lastModified;
    }
}