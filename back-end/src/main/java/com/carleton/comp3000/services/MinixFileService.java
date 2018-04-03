package com.carleton.comp3000.services;

import com.carleton.comp3000.exceptions.ChannelNotConnectedException;
import com.carleton.comp3000.models.MinixDirectory;
import com.carleton.comp3000.models.MinixEntry;
import com.carleton.comp3000.models.MinixFile;
import com.carleton.comp3000.models.ShortEntry;
import com.carleton.comp3000.modules.SftpModule;
import com.carleton.comp3000.resources.ContentFileResource;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.SftpATTRS;
import com.jcraft.jsch.SftpException;
import java.io.InputStream;
import java.util.List;
import java.util.Vector;
import java.util.stream.Collectors;

import javax.ws.rs.core.UriInfo;

public class MinixFileService {

    private SftpService service;
    private UriInfo uriInfo;

    public MinixFileService(SftpService service, UriInfo uriInfo) {
        this.service = service;
        this.uriInfo = uriInfo;
    }

    public UriInfo getUriInfo() {
        return uriInfo;
    }

    public void setUriInfo(UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }

    public MinixEntry getMinixEntry(String path) throws ChannelNotConnectedException, SftpException {
        ChannelSftp channel = service.getMinixChannel();
        MinixEntry entry = null;

        SftpATTRS stat = channel.stat(path);

        if (stat.isDir()) {
            entry = getMinixDirectory(channel, path);
        } else {
            entry = getMinixFile(channel, path);
        }

        return entry;

    }

    private MinixFile getMinixFile(ChannelSftp channel, String path) {
        MinixFile file = new MinixFile(path);
        file.setUrls(uriInfo);
        file.setDownloadLink(uriInfo);
        return file;
    }

    private MinixDirectory getMinixDirectory(ChannelSftp channel, String path) throws SftpException {
        @SuppressWarnings("unchecked")
        Vector<LsEntry> lsEntries = channel.ls(path);

        // Get the list of entries in the folder
        List<ShortEntry> entries = lsEntries.stream().map(e -> {
            String name = e.getFilename();
            String url;
            String type;
            if (e.getAttrs().isDir()) {
                url = uriInfo.getAbsolutePathBuilder().path(name).build().toString();
                type = "directory";
            } else {
                url = uriInfo.getBaseUriBuilder().path(ContentFileResource.class).path(path).path(name).build().toString();
                type = "file";
            }
            return new ShortEntry(e.getFilename(), url, type);
        }).collect(Collectors.toList());

        MinixDirectory dir = new MinixDirectory(path, entries);

        dir.setUrls(uriInfo);

        return dir;
    }

    public InputStream getFileContent(String path) throws ChannelNotConnectedException, SftpException {
        ChannelSftp channel = service.getMinixChannel();

        return channel.get(path);
    }
}