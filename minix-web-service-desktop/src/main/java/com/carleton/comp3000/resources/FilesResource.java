package com.carleton.comp3000.resources;

import com.carleton.comp3000.exceptions.ChannelNotConnectedException;
import com.carleton.comp3000.models.ErrorMessage;
import com.carleton.comp3000.models.MinixEntry;
import com.carleton.comp3000.services.MinixFileService;
import com.jcraft.jsch.SftpException;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path("/files")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FilesResource {

    private MinixFileService minixService;
    
    public FilesResource(@Context UriInfo uriInfo) {
        minixService = new MinixFileService(uriInfo);
    }

    @GET
    @Path("/{path:.*}")
    public MinixEntry getEntry(@PathParam("path") String path) throws WebApplicationException {
        try {
            return minixService.getMinixEntry("/" + path);
        } catch (ChannelNotConnectedException e) {
            ErrorMessage message = new ErrorMessage("Could not connect to the ssh server", 503, "https://github.com/TrCaM");
            Response response = Response.status(503).entity(message).build();
            throw new WebApplicationException(response);
        } catch (SftpException e) {
            ErrorMessage message = new ErrorMessage("Path does not exist", 404, "https://github.com/TrCaM");
            Response response = Response.status(404).entity(message).build();
            throw new WebApplicationException(response);
        }
    }
}
