package aor.paj.service;

import aor.paj.bean.UserBean;
import aor.paj.dto.User;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/user")
public class UserService {

    @Inject
    UserBean userBean;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON) public List<User> getUsers() {
        return userBean.getUsers();
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON) public Response addUser(User a) {
        userBean.addUser(a);
        return Response.status(200).entity("A new user is created").build();
    }

}
