package com.carleton.comp3000.models;

import java.util.Date;

public class ShortEntry {
    
    private String url;
    private String name;
    private String type;
    private long size;
    private long lastModified;

    public ShortEntry(String name, String url, String type, long size, long lastM) {
        super();
        this.url = url;
        this.type = type;
        this.size = size;
        this.lastModified = lastM;
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
    
    
}
