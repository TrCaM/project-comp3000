package com.carleton.comp3000.models;

public class ShortEntry {
    
    private String url;
    private String name;
    private String type;
    private long size;
    private long lastModified;
    private int permissions;
    private String permissionsString;
    private int uid;

	public ShortEntry(String name, String url, String type, long size, long lastM, int permissions, String pString, int uid) {
        super();
        this.url = url;
        this.type = type;
        this.size = size;
        this.lastModified = lastM;
        this.permissions = permissions;
        this.permissionsString = pString;
        this.uid = uid;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
