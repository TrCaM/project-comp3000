package com.carleton.comp3000.models;

import com.carleton.comp3000.resources.FilesResource;

import javax.ws.rs.core.UriInfo;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public abstract class MinixEntry {

    protected String absolutePath;
    protected String url;
    protected String name;
    protected String parentUrl;
    protected boolean directory;
    protected long size;
    protected long lastModified;
    protected int permissions;
    protected String permissionsString;
    protected int uid;

    public MinixEntry() {
        
    }

    public MinixEntry(String path) {
        this.absolutePath = path;
        this.name = path.substring(path.lastIndexOf('/') + 1);
    }

    public String getAbsolutePath() {
        return absolutePath;
    }

    public void setAbsolutePath(String absolutePath) {
        this.absolutePath = absolutePath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParentUrl() {
        return parentUrl;
    }

    public void setParentUrl(String parentUrl) {
        this.parentUrl = parentUrl;
    }
    
    public boolean isDirectory() {
        return this.directory;
    }

    public ShortEntry convertToShort() {
        String type;

        if (this.directory) {
            type = "directory";
        } else {
            type = "file";
        }

        return new ShortEntry(name, url, type, size, lastModified, permissions, permissionsString, uid);
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setUrls(UriInfo info) {
        url = info.getAbsolutePath().toString();
        if (!absolutePath.isEmpty()) {
            parentUrl = info.getBaseUriBuilder()
                            .path(FilesResource.class)
                            .path(absolutePath.substring(0, absolutePath.lastIndexOf('/')))
                            .build()
                            .toString();
        } else {
            parentUrl = info.getBaseUri().toString();
        }
    }

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public long getLastModified() {
		return lastModified;
	}

	public void setLastModified(long lastModified) {
		this.lastModified = lastModified;
	}

	public int getPermissions() {
		return permissions;
	}

	public void setPermissions(int permissions) {
		this.permissions = permissions;
	}

	public String getPermissionsString() {
		return permissionsString;
	}

	public void setPermissionsString(String permissionsString) {
		this.permissionsString = permissionsString;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}
   
}

