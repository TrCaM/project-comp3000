package com.carleton.comp3000.models;

public class ShortEntry {
    
    private String url;
    private String name;
    private String type;

    public ShortEntry(String name, String url, String type) {
        super();
        this.url = url;
        this.type = type;
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
    
}
