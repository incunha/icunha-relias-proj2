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

    @GET
    @Path("/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@PathParam("username") String username) {
        System.out.println(username);
        User user = userBean.getUser(username);
        if (user == null) {
            return Response.status(404).entity("Username não encontrado.").build();
        } else {
            return Response.status(200).entity(user).build();
        }
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
    public Response verifyUsername(@QueryParam("username") String username){
        List<User> users = userBean.getUsers();
            for(User user: users){
            if(user.getUsername().equals(username)){
                return Response.status(200).entity("Username já existe.").build();
            }
        }
        return Response.status(404).entity("Username disponível.").build();
    }

    @GET
    @Path("/verifyLogin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response verifyLogin(@QueryParam("username") String username, @QueryParam("password") String password) {
        User verifiedUser = userBean.verifyLogin(username, password);
        System.out.println(username+"------"+password);
        if (verifiedUser == null) {
            return Response.status(401).entity("Username ou password incorretos.").build();
        } else {
            return Response.status(200).entity(verifiedUser).build();
        }
    }

    @GET
    @Path("/userbyusername")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@QueryParam("username") String username) {
        System.out.println("HERE");
        User userByUsername = userBean.getUser(username);
        if (userByUsername== null) {
            return Response.status(404).entity("User with this username is not found").build();
        } else {
            return Response.status(200).entity(userByUsername).build();
        }
    }

    @PUT
    @Path("/updateUser")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(User user) {
        List<User> users = userBean.getUsers();
        for (User u : users) {
            if (user.getUsername().equals(u.getUsername())) {
                userBean.updateUserToNew(u, user);
                return Response.status(200).entity("Info changed.").build();
            }
        }
        return Response.status(404).entity("User with this username is not found").build();
    }




}