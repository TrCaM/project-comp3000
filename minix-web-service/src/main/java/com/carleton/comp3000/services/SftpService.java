package com.carleton.comp3000.services;

import com.carleton.comp3000.exceptions.ChannelNotConnectedException;
import com.google.inject.Singleton;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import java.util.Properties;

@Singleton
public class SftpService {

    private JSch jsch;

    private Session session;
    private ChannelSftp channelSftp;
    private States status;
    private enum States {CONNECTED, NOT_CONNECTED};

    public SftpService() {
        this.jsch = new JSch();
        status = States.NOT_CONNECTED;
    }

    public boolean openNewSession(String hostName, int port, String username, String password) {
        try {
			session = jsch.getSession(username, hostName, port);
            session.setPassword(password);

            Properties config = new Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
        
            session.connect();
		} catch (JSchException e) {
            session = null;
            return false;
        }
        
        return true;
    }

    public void closeSession() {
        if (session != null && session.isConnected()) {
            session.disconnect();
            session = null;
        }
    }
    
    public boolean isChannelConnected() {
        return this.status == States.CONNECTED;
    }

    public boolean openSftpChannel() {
        if (session == null || !session.isConnected()) {
            return false;
        }
        
        try {
            channelSftp = (ChannelSftp) session.openChannel("sftp");
            channelSftp.connect();
        } catch (JSchException e) {
            channelSftp = null;
        }

        this.status = States.CONNECTED;
        return true;
    }
    
    public ChannelSftp getConnectedChannel() throws ChannelNotConnectedException {
        if (status != States.CONNECTED) throw new ChannelNotConnectedException();
        
        return this.channelSftp;
    }

    public void closeChannel() {
        if (channelSftp != null && channelSftp.isConnected() && !channelSftp.isClosed()) {
            channelSftp.exit();
            channelSftp.disconnect();
            this.status = States.NOT_CONNECTED;
        }
    }

    public void clean() {
        closeChannel();
        closeSession();
    }

    public ChannelSftp getMinixChannel() throws ChannelNotConnectedException {
        if (status == States.NOT_CONNECTED) {
            connectToMinix();
        }
        
        return getConnectedChannel();
    }

    private void connectToMinix() {
        clean();
        openNewSession("localhost", 2222, "root", "Password");
        openSftpChannel();
    }
}
