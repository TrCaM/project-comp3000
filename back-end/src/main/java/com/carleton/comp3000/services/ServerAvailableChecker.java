package com.carleton.comp3000.services;

import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Observable;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.carleton.comp3000.models.SessionInfo;

public class ServerAvailableChecker extends Observable implements Runnable {

	private SessionInfo session;
	private boolean available;
	private ScheduledExecutorService exec;
	private Future<?> future;

	public ServerAvailableChecker(SftpService service, SessionInfo info) {
		super();
		this.available = false;
		this.exec = Executors.newSingleThreadScheduledExecutor();
		this.session = info;
		this.addObserver(service);
	}

	@Override
	public void run() {
		setAvailable(checkServer());
	}

	public boolean checkServer() {
		Socket socket = null;
		boolean retVal = false;
		try {
			socket = new Socket(session.getHostName(), session.getPort());
			retVal = true;
		} catch (UnknownHostException e) {
			retVal = false;
		} catch (IOException e) {
			retVal = false;
		} finally {
			if (socket != null) {
				try {
					socket.close();
				} catch (Exception e) {
				}
			}
		}

		return retVal;
	}

	public void scheduleCheck() {
		future = exec.scheduleAtFixedRate(this, 0, 10, TimeUnit.SECONDS);
	}

	public void stopCheck() {
		if (future != null) {
			future.cancel(true);
		}
		
		future = null;
	}

	public boolean isServerAvailable() {
		return available;
	}

	public synchronized void setAvailable(boolean available) {
		this.available = available;
		if (available == false) {
			setChanged();
			notifyObservers();
		}
	}

}
