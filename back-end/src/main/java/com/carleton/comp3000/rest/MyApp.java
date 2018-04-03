package com.carleton.comp3000.rest;


import javax.inject.Singleton;
import javax.ws.rs.ApplicationPath;

import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.ResourceConfig;

import com.carleton.comp3000.services.MinixFileService;
import com.carleton.comp3000.services.SftpProvider;
import com.carleton.comp3000.services.SftpService;

@ApplicationPath("webapi")
public class MyApp extends ResourceConfig {

    public MyApp() {
        packages("com.carleton.comp3000.resources",
                 "com.carleton.comp3000.readwrite",
                 "com.carleton.comp3000.enums",
                 "com.carleton.comp3000.exceptions",
                 "com.carleton.comp3000.models",
                 "com.carleton.comp3000.filters",
                 "com.carleton.comp3000.services");
        register(new AbstractBinder() {
            @Override
            protected void configure() {
                bindFactory(SftpProvider.class).to(SftpService.class).in(Singleton.class);
//                bind(new SftpService()).to(SftpService.class);
            }
        });
    }
    
}
