export class BasicEntry {
    name: string;
    url: string;
    isDir: boolean;
    size: number;
    lastModified: Date;
    permissions: number;
    permissionsString: string;
    uid: number;

    constructor(name: string, url: string, isDir: boolean, size: number,
                lastModified: Date, permissions: number, permissionsString: string, uid: number) {
        this.name = name;
        this.url = url;
        this.isDir = isDir;
        this.size = size;
        this.lastModified = lastModified;
        this.permissions = permissions;
        this.permissionsString = permissionsString;
        this.uid = uid;
    }
}
