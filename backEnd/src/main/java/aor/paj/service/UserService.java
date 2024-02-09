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
    @Path("/users")
    @Produces(MediaType.APPLICATION_JSON) public List<User> getUsers() {
        return userBean.getUsers();
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON) public Response addUser(User a) {
        try {
            userBean.addUser(a);
            return Response.status(200).entity("A new user is created").build();
        }catch (Exception e){
            return Response.status(401).build();
        }

    }
    @POST
    @Path("/validate")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response validateUser(User a) {
        if (a == null ||
                a.getFirstName() == null || a.getFirstName().isEmpty() ||
                a.getLastName() == null || a.getLastName().isEmpty() ||
                a.getEmail() == null || a.getEmail().isEmpty() ||
                a.getPassword() == null || a.getPassword().isEmpty() ||
                a.getPhoneNumber() == null || a.getPhoneNumber().isEmpty() ||
                a.getUsername() == null || a.getUsername().isEmpty()) {
            return Response.status(401).entity("Campos obrigatórios não preenchidos.").build();
        }
        return Response.status(200).entity("Campos preenchidos").build();
    }
    @POST
    @Path("/verifyUsername")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response verifyUsername(User a){
        List<User> users = userBean.getUsers();
        for(User user: users){
            if(user.getUsername().equals(a.getUsername())){
                return Response.status(200).entity("Username já existe.").build();
            }
        }
        return Response.status(404).entity("Username disponível.").build();
    }

}