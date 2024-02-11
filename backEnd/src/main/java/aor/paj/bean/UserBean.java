package aor.paj.bean;


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

    public void addUser (User a) {
        System.out.println(a.getUsername());
        users.add(a);
        writeIntoJsonFile();
    }

    public User getUser(String username){
        for(User user: users){
            if(user.getUsername().equals(username)){
                return user;
            }
        }
        return null;
    }

    public ArrayList<User> getUsers() {
        return users;
    }

    private void writeIntoJsonFile(){
        Jsonb jsonb = JsonbBuilder.create(new JsonbConfig().withFormatting(true));
        try {
            jsonb.toJson(users, new FileOutputStream(filenameUser));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e); }
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

    public User verifyUsername(String username){
        for(User user: users){
            if(user.getUsername().equals(username)){
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
}






