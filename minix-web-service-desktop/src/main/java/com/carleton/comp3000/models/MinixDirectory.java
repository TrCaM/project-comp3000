package com.carleton.comp3000.models;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class MinixDirectory extends MinixEntry {

    private List<ShortEntry> children;

    public MinixDirectory(String path) {
        super(path);
        this.directory = true;
    }

    public MinixDirectory(String path, List<ShortEntry> children) {
        super(path);
        this.directory = true;
        this.children = children;
    }

    public List<ShortEntry> getChildren() {
        return children;
    }

    public void setChildren(List<ShortEntry> children) {
        this.children = children;
    }
}
