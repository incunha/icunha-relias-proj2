package aor.paj.bean;
import aor.paj.dto.Task;
import aor.paj.dto.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;

@ApplicationScoped
public class UserBean {

    final String filenameUser = "users.json";
    private ArrayList <User> users;

    public boolean usernameExists(String username){
        for(User user: users){
            if(user.getUsername().equals(username)){
                return true;
            }
        }
        return false;
    }

    public boolean emailExists(String email){
        for(User user: users){
            if(user.getEmail().equals(email)){
                return true;
            }
        }
        return false;
    }

    public UserBean () {
        File f = new File (filenameUser);
        if (f.exists()) {
            try {
                FileReader filereader = new FileReader(f);
                users = JsonbBuilder.create().fromJson(filereader, new ArrayList<User>() {}.getClass().getGenericSuperclass());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e); }
        }else
            users = new ArrayList<>();
    }

    private void writeIntoJsonFile(){
        Jsonb jsonb = JsonbBuilder.create(new JsonbConfig().withFormatting(true));
        try {
            jsonb.toJson(users, new FileOutputStream(filenameUser));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e); }
    }

    public ArrayList<User> getUsers() {
        return users;
    }

    public User getUser(String username){
        for(User user: users){
            if(user.getUsername().equals(username)){
                return user;
            }
        }
        return null;
    }

    public void addUser (User a) {
        System.out.println(a.getUsername());
        a.setTasks(new ArrayList<>());
        users.add(a);
        writeIntoJsonFile();
    }

    public boolean validateFields (User a) {
        if (a == null ||
                a.getFirstName() == null || a.getFirstName().isEmpty() ||
                a.getLastName() == null || a.getLastName().isEmpty() ||
                a.getEmail() == null || a.getEmail().isEmpty() ||
                a.getPassword() == null || a.getPassword().isEmpty() ||
                a.getPhoneNumber() == null || a.getPhoneNumber().isEmpty() ||
                a.getUsername() == null || a.getUsername().isEmpty()) {
            return false;
        }
        return true;
    }

    public User verifyLogin(String username, String password){
        System.out.println(username+" "+password);
        for(User user: users){
            if(user.getUsername().equals(username) && user.getPassword().equals(password)){
                return user;
            }
        }
        return null;
    }

    public boolean userUpdate(String username){
        User user = getUser(username);

        for(User u: users){
            if(u.getUsername().equals(username)){
                u.setPassword(user.getPassword());
                u.setFirstName(user.getFirstName());
                u.setLastName(user.getLastName());
                u.setEmail(user.getEmail());
                u.setPhoneNumber(user.getPhoneNumber());
                u.setProfilePhoto(user.getProfilePhoto());
                writeIntoJsonFile();
                return true;
            }
        }
        return false;
    }

    public boolean AuthorizeUser(String username, String password){
        for(User user: users){
            if(user.getUsername().equals(username) && user.getPassword().equals(password)){
                return true;
            }
        }
        return false;
    }
    public void addTask(String username, Task t){
        for(User u: users){
            if(u.getUsername().equals(username)){
                u.addTask(t);
                writeIntoJsonFile();
            }
        }
    }

    public void removeTask(String username, String id){
        for(User u: users){
            if(u.getUsername().equals(username)){
                u.removeTask(id);
                writeIntoJsonFile();
            }
        }
    }
}






