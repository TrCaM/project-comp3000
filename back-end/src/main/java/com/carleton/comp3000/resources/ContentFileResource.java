package com.carleton.comp3000.resources;

import com.carleton.comp3000.exceptions.ChannelNotConnectedException;
import com.carleton.comp3000.models.Message;
import com.carleton.comp3000.services.MinixFileService;
import com.carleton.comp3000.services.SftpService;
import com.jcraft.jsch.SftpException;

import java.io.InputStream;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("/content")
@Consumes(MediaType.APPLICATION_JSON)
public class ContentFileResource {
    
    private MinixFileService minixService;
    
    @Inject
    public ContentFileResource(SftpService service, @Context UriInfo uriInfo) {
        minixService = new MinixFileService(service, uriInfo);
    }

    @GET
    @Path("/{path:.*}")
    public Response getFileContent(@PathParam("path") String path) throws WebApplicationException {
        try {
            InputStream fileContent = minixService.getFileContent("/" + path);
            return Response.ok(fileContent, MediaType.APPLICATION_OCTET_STREAM)
                    .header("Content-Disposition",
                            "attachment; filename=\"" + path.substring(path.lastIndexOf('/') + 1) + "\"" )
                    .build();
        } catch (ChannelNotConnectedException e) {
            Message message = new Message("Could not connect to the ssh server", 503);
            Response response = Response.status(503)
            						    .entity(message)
            						    .type(MediaType.APPLICATION_JSON)
            						    .build();
            throw new WebApplicationException(response);
        } catch (SftpException e) {
            Message message = new Message(e.getMessage(), 404);
            Response response = Response.status(404)
            							.entity(message)
            							.type(MediaType.APPLICATION_JSON)
            							.build();
            throw new WebApplicationException(response);
        }
    }
    
    @PUT
    @Path("/{path:.*}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateFile(
    		@PathParam("path") String path,
    		@FormDataParam("file") InputStream fileContent,
    		@FormDataParam("file") FormDataContentDisposition fileDetail) throws WebApplicationException {
        try {
        	minixService.updateFile("/" + path, fileContent);
            return Response.ok(new Message("File uploaded", 200)).build();
        } catch (ChannelNotConnectedException e) {
            Message message = new Message("Could not connect to the ssh server", 503);
            Response response = Response.status(503).entity(message).build();
            throw new WebApplicationException(response);
        } catch (SftpException e) {
        	e.printStackTrace();
            Message message = new Message("Path does not exist", 404);
            Response response = Response.status(404).entity(message).build();
            throw new WebApplicationException(response);
        }
    }
}
