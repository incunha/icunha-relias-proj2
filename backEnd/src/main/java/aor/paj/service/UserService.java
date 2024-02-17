package aor.paj.service;

import aor.paj.bean.UserBean;
import aor.paj.dto.Task;
import aor.paj.dto.User;
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
    @Produces(MediaType.APPLICATION_JSON) public List<User> getUsers() {
        return userBean.getUsers();
    }
    @GET
    @Path("/getUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@HeaderParam("username") String username) {

        User user = userBean.getUser(username);
        if (user == null) {
            return Response.status(404).entity("User não encontrado.").build();
        } else {
            return Response.status(200).entity(user).build();
        }
    }

    @GET
    @Path("/profilePhoto")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProfilePhoto(@HeaderParam("username") String username) {
        User user = userBean.getUser(username);
        if (user == null) {
            return Response.status(404).entity("User não encontrado.").build();
        } else {
            return Response.status(200).entity(user.getProfilePhoto()).build();
        }
    }
    @POST
    @Path("/addTask")
    @Consumes(MediaType.APPLICATION_JSON) public Response addTask(@HeaderParam("username")String username,@HeaderParam("password")String password, Task t) {

        if(!userBean.authorizeUser(username, password)){
            return Response.status(405).entity("Forbidden.").build();
        } else {
            t.createId();t.inicialStatus();
            System.out.println(t.getId()+" "+t.getStatus()+" "+t.getTitle());
            userBean.addTask(username, t);
            return Response.status(200).entity("A new task is created").build();
        }
    }
    @DELETE
    @Path("/deleteTask")
    @Produces(MediaType.APPLICATION_JSON) public Response removeTask(@HeaderParam("username")String username,@HeaderParam("password")String password, @HeaderParam("id") String id) {
        if(!userBean.authorizeUser(username, password)){
            return Response.status(405).entity("Forbidden.").build();
        } else {
            userBean.removeTask(username, id);
            return Response.status(200).entity("Task is removed").build();
        }
    }
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(User a) {
        if(userBean.usernameExists(a.getUsername()) || userBean.emailExists(a.getEmail())){
            return Response.status(401).entity("Username ou mail já existe.").build();
        }else if (!userBean.validateFields(a)) {
            return Response.status(401).entity("Campos obrigatórios não preenchidos.").build();
        }else {
            userBean.addUser(a);
            return Response.status(200).entity("Usuário criado.").build();
        }
    }
    @GET
    @Path("/verifyLogin")
    @Produces(MediaType.APPLICATION_JSON)
    public Response verifyLogin(@HeaderParam("username") String username, @HeaderParam("password") String password) {
        User verifiedUser = userBean.verifyLogin(username, password);

        if (verifiedUser == null) {
            return Response.status(401).entity("Username ou password incorretos.").build();
        } else {
            return Response.status(200).entity(verifiedUser).build();
        }
    }
    @GET
    @Path("/logout")
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout(@HeaderParam("username")String username) {
        User user = userBean.logout(username);
        if (user == null) {
            return Response.status(404).entity("User não encontrado.").build();
        } else {
            return Response.status(200).entity("Logout efetuado.").build();
        }
    }
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@HeaderParam("username")String username,@HeaderParam("password")String password, User user) {
        List<User> users = userBean.getUsers();
        for (User u : users) {
            if (username.equals(u.getUsername())) {
                userBean.updateUserToNew(u,user);
                return Response.status(200).entity("Info changed.").build();
            }
        }
        return Response.status(404).entity("User with this username is not found").build();
    }
    @GET
    @Path("/tasks")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllTasks(@HeaderParam("username")String username,@HeaderParam("password")String password) {
        if(!userBean.authorizeUser(username, password)){
            return Response.status(405).entity("Forbidden.").build();
        } else {
            ArrayList<Task> tasks = userBean.getAllTasks(username);
            userBean.orderTasks(username,tasks);
            return Response.status(200).entity(tasks).build();
        }
    }

    @PUT
    @Path("/task/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateTask(@HeaderParam("username")String username,@HeaderParam("password")String password, @HeaderParam("id") String id, Task t) {
        System.out.println("FODA-SE");
        if(!userBean.authorizeUser(username, password)){
            return Response.status(405).entity("Forbidden.").build();
        } else {
            userBean.updateTask(username, id, t);
            System.out.println("t.getStatus() = " + t.getStatus());
            return Response.status(200).entity("Task updated.").build();
        }
    }

    @GET
    @Path("/getTask")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTask(@HeaderParam("username")String username,@HeaderParam("password")String password, @HeaderParam("id") String id) {
        if(!userBean.authorizeUser(username, password)){
            return Response.status(405).entity("Forbidden.").build();
        } else {
            Task task = userBean.getTask(username, id);
            if (task == null) {
                return Response.status(404).entity("Task não encontrada.").build();
            } else {
                return Response.status(200).entity(task).build();
            }
        }
    }

}