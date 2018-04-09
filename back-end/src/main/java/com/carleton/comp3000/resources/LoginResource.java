package com.carleton.comp3000.resources;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.carleton.comp3000.models.Message;
import com.carleton.comp3000.models.SessionInfo;
import com.carleton.comp3000.services.SftpService;

@Path("/login")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class LoginResource {
	
	private SftpService sftpService;
    
    @Inject
    public LoginResource(SftpService service) {
    	this.sftpService = service;
    }

    @POST
    public Response login(SessionInfo info) throws WebApplicationException {
    	if (this.sftpService.openNewSession(info)){
			return Response.ok(info).build();
    	} else {
            Message message = new Message("Can't connect! Unauthorized", 401);
            Response response = Response.status(message.getCode())
            						    .entity(message)
            						    .type(MediaType.APPLICATION_JSON)
            						    .build();
            throw new WebApplicationException(response);
    	}
    }
}

