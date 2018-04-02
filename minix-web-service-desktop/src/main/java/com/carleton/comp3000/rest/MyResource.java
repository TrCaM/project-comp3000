package com.carleton.comp3000.rest;

import java.util.Calendar;
import java.util.Date;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("test")
public class MyResource {
    
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Date testMethod() {
        return Calendar.getInstance().getTime();
    }
}
