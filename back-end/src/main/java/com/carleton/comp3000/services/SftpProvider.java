package com.carleton.comp3000.services;

import org.glassfish.hk2.api.Factory;

public class SftpProvider implements Factory<SftpService>{

    @Override
    public SftpService provide() {
        return new SftpService();
    }

    @Override
    public void dispose(SftpService instance) {
        instance.clean();
    }

}
