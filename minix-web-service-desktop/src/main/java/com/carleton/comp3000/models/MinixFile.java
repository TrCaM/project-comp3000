package com.carleton.comp3000.models;

import javax.ws.rs.core.UriInfo;
import javax.xml.bind.annotation.XmlRootElement;

import com.carleton.comp3000.resources.ContentFileResource;

@XmlRootElement
public class MinixFile extends MinixEntry {
    
    private String download;

    public MinixFile(String path) {
        super(path);
        this.directory = false;
    }
    
    public String getDownload() {
        return download;
    }

    public void setDownload(String download) {
        this.download = download;
    }



    public void setDownloadLink(UriInfo uriInfo) {
        this.download = uriInfo.getBaseUriBuilder()
                               .path(ContentFileResource.class)
                               .path(absolutePath)
                               .build().toString();
    }
    
}
