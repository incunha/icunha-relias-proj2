package aor.paj.service;

import aor.paj.bean.UserBean;
import aor.paj.dto.Task;
import aor.paj.dto.User;
import aor.paj.dto.UserDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
import java.util.List;

@Path("/users")
public class UserService {

    @Inject
    UserBean userBean;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON) public List<UserDTO> getUsers() {
        List<User> users = userBean.getUsers();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            userDTOs.add(user.toUserDTO());
        }
        return userDTOs;
    }


    @GET
    @Path("/getUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@HeaderParam("username") String username) {
        User user = userBean.getUser(username);
        if (user == null) {
            return Response.status(404).entity("User not found").build();
        } else {
            return Response.status(200).entity(user).build();
        }
    }

    @GET
    @Path("/profilePhoto")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProfilePhoto(@HeaderParam("username") String username, @HeaderParam("password") String password) {
        User user = userBean.getUser(username);
        if (!userBean.authorizeUser(username, password)) {
            return Response.status(403).entity("Forbidden").build();
        } else if (user == null) {
            return Response.status(404).entity("User not found").build();
        } else {
            return Response.status(200).entity(user.getProfilePhoto()).build();
        }
    }

    @POST
    @Path("/addTask")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addTask(@HeaderParam("username")String username,@HeaderParam("password")String password, Task t) {
        try {
            if (!userBean.authorizeUser(username, password)) {
                return Response.status(403).entity("Forbidden").build();
            }

            t.createId();
            t.inicialStatus();
            userBean.addTask(username, t);

            return Response.status(200).entity("A new task has been created").build();
        } catch (Exception e) {
            return Response.status(500).entity("Internal Server Error: " + e.getMessage()).build();
        }
    }

    @DELETE
    @Path("/deleteTask")
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeTask(@HeaderParam("username")String username,@HeaderParam("password")String password, @HeaderParam("id") String id) {
        try {
            if (!userBean.authorizeUser(username, password)) {
                return Response.status(403).entity("Forbidden").build();
            } else {
                userBean.removeTask(username, id);
                return Response.status(200).entity("Task has been removed").build();
            }
        } catch (Exception e) {
            return Response.status(500).entity("Internal Server Error: " + e.getMessage()).build();
        }
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(User a) {
        try {
            if (userBean.usernameExists(a.getUsername()) || userBean.emailExists(a.getEmail())) {
                return Response.status(409).entity("Username or email already exists").build();
            } else if (!userBean.validateFields(a)) {
                return Response.status(400).entity("Required fields not filled").build();
            } else {
                userBean.addUser(a);
                return Response.status(201).entity("User created successfully").build();
            }
        } catch (Exception e) {
            return Response.status(500).entity("Internal server error:"  + e.getMessage()).build();
        }
    }
    @GET
    @Path("/verifyLogin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response verifyLogin(@HeaderParam("username") String username, @HeaderParam("password") String password) {
        try {
            User verifiedUser = userBean.verifyLogin(username, password);

            if (verifiedUser == null) {
                return Response.status(401).entity("Incorrect username or password").build();
            } else {
                return Response.status(200).entity(verifiedUser).build();
            }
        } catch (Exception e) {
            return Response.status(500).entity("Internal server error: " + e.getMessage()).build();
        }
    }
    @GET
    @Path("/logout")
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout(@HeaderParam("username")String username) {
        User user = userBean.logout(username);
        if (user == null) {
            return Response.status(404).entity("User not found").build();
        } else {
            userBean.writeIntoJsonFile();
            return Response.status(200).entity("Logout successfully").build();
        }
    }
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@HeaderParam("username") String username, @HeaderParam("password") String password, User updatedUser) {

        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            return Response.status(400).entity("The 'username' and 'password' headers are required").build();
        }

        if (!userBean.authorizeUser(username, password)) {
            return Response.status(403).entity("User is not authorized").build();
        }

        List<User> users = userBean.getUsers();
        for (User u : users) {
            if (username.equals(u.getUsername())) {

                userBean.updateUserToNew(u, updatedUser);
                return Response.status(200).entity("Information updated").build();
            }
        }

        return Response.status(404).entity("User with this username is not found").build();
    }
    @GET
    @Path("/tasks")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllTasks(@HeaderParam("username")String username,@HeaderParam("password")String password) {
        if (!userBean.authorizeUser(username, password)) {
            return Response.status(403).entity("Forbidden").build();
        } else {
            ArrayList<Task> tasks = userBean.getAllTasks(username);
            userBean.orderTasks(username, tasks);
            return Response.status(200).entity(tasks).build();
        }
    }

    @PUT
    @Path("/task/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateTask(@HeaderParam("username")String username,@HeaderParam("password")String password, @HeaderParam("id") String id, Task t) {
        if (!userBean.authorizeUser(username, password)) {
            return Response.status(403).entity("Forbidden").build();
        } else {
            userBean.updateTask(username, id, t);
            System.out.println("Updated task status: " + t.getStatus());
            return Response.status(200).entity("Task updated successfully").build();
        }
    }

    @GET
    @Path("/getTask")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTask(@HeaderParam("username")String username,@HeaderParam("password")String password, @HeaderParam("id") String id) {
        if (!userBean.authorizeUser(username, password)) {
            return Response.status(403).entity("Forbidden").build();
        } else {
            Task task = userBean.getTask(username, id);
            if (task == null) {
                return Response.status(404).entity("Task not found").build();
            } else {
                return Response.status(200).entity(task).build();
            }
        }
    }
}