package com.carleton.comp3000.services;

import com.carleton.comp3000.exceptions.ChannelNotConnectedException;
import com.carleton.comp3000.models.SessionInfo;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

import java.util.Observable;
import java.util.Observer;
import java.util.Properties;

public class SftpService implements Observer {

	private JSch jsch;
	private ServerAvailableChecker checker;

	private Session session;
	private ChannelSftp channelSftp;
	private States status;

	private enum States {
		CONNECTED, NOT_CONNECTED
	};

	public SftpService() {
		this.jsch = new JSch();
		status = States.NOT_CONNECTED;
	}
	
	public boolean openNewSession(SessionInfo info) {
		clean();
		this.checker = new ServerAvailableChecker(this, info);
		checker.run();
		if (checker.checkServer()) {
			try {
				session = jsch.getSession(info.getUsername(), info.getHostName(), info.getPort());
				session.setPassword(info.getPassword());

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
		
		return false;
	}

	public void closeSession() {
		if (session != null) {
			session.disconnect();
		}
		session = null;
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
			return false;
		}

		this.status = States.CONNECTED;
		checker.scheduleCheck();
		return true;
	}

	public ChannelSftp getConnectedChannel() throws ChannelNotConnectedException {
		if (status != States.CONNECTED && !openSftpChannel() && channelSftp == null)
			throw new ChannelNotConnectedException();

		return this.channelSftp;
	}

	public void closeChannel() {
		if (channelSftp != null) {
			channelSftp.exit();
			channelSftp.disconnect();
		}
		this.status = States.NOT_CONNECTED;
		this.channelSftp = null;
		if (checker != null) 
			checker.stopCheck();
	}

	public void clean() {
		closeChannel();
		closeSession();
	}

	@Override
	public void update(Observable o, Object arg) {
		if (!checker.isServerAvailable()) {
			clean();
		}
	}

}
