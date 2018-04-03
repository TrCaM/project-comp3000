package com.carleton.comp3000.guice;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpATTRS;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;
import java.util.Vector;

public class GuiceTest {

    public static void main(String[] args) {
        String fileName = "Makefile";
        String host = "localhost";
        int port = 2222;
        String username = "root";
        String password = "Password";
        String workingDir = "/usr";

        Session session = null;
        Channel channel = null;
        ChannelSftp channelSftp = null;
        System.out.println("Preparing the host information for sftp");

        try {
            JSch jsch = new JSch();
            session = jsch.getSession(username, host, port);
            session.setPassword(password);

            Properties config = new Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect();
            System.out.println("Host connected.");

            channel = session.openChannel("sftp");
            channel.connect();
            System.out.println("sftp channel opened and connected.");
            channelSftp = (ChannelSftp) channel;
            channelSftp.cd(workingDir);
            
//            InputStream in = channelSftp.get("Makefile");
//            System.out.println(getStringFromInputStream(in));
            System.out.println(channelSftp.getHome());
            
            SftpATTRS stat = channelSftp.stat("/usr/src" );
            
            System.out.println(stat.isDir());

            Vector<LsEntry> lsEntries = channelSftp.ls(workingDir);
            
            lsEntries.stream().forEach(e -> System.out.println(e.getFilename()));

        } catch (Exception ex) {
            ex.printStackTrace(System.out);
        } finally {
            channelSftp.exit();
            System.out.println("Exited");
            channelSftp.disconnect();
            System.out.println("Disconnected");
        }

    }
    
    // convert InputStream to String
    private static String getStringFromInputStream(InputStream is) {

        BufferedReader br = null;
        StringBuilder sb = new StringBuilder();

        String line;
        try {

            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                sb.append(line);
                sb.append("\n");
            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return sb.toString();

    }


}
