package com.carleton.comp3000.modules;

import com.carleton.comp3000.services.SftpService;
import com.google.inject.AbstractModule;

public class SftpModule extends AbstractModule {

    /**
     * Note: Making use of a singleton JSch instance
     */
    @Override
    protected void configure() {
        bind(SftpService.class);
    }

}
