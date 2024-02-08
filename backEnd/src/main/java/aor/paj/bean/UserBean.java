package aor.paj.bean;

import aor.paj.dto.Task;
import aor.paj.dto.User;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;

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
            users = new ArrayList<User>();
    }

    public void addUser (User a) {
        users.add(a);
        writeIntoJsonFile();
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
}






