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
import java.util.Comparator;

@ApplicationScoped
public class UserBean {

    final String filenameUser = "users.json";
    private ArrayList<User> users;

    public boolean usernameExists(String username) {
        for (User user : users) {
            if (user.getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }

    public boolean emailExists(String email) {
        for (User user : users) {
            if (user.getEmail().equals(email)) {
                return true;
            }
        }
        return false;
    }

    public UserBean() {
        File f = new File(filenameUser);
        if (f.exists()) {
            try {
                FileReader filereader = new FileReader(f);
                users = JsonbBuilder.create().fromJson(filereader, new ArrayList<User>() {
                }.getClass().getGenericSuperclass());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        } else
            users = new ArrayList<>();
    }

    public void writeIntoJsonFile() {
        Jsonb jsonb = JsonbBuilder.create(new JsonbConfig().withFormatting(true));
        try {
            jsonb.toJson(users, new FileOutputStream(filenameUser));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public ArrayList<User> getUsers() {
        return users;
    }

    public User getUser(String username) {
        for (User user : users) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }
        return null;
    }

    public void addUser(User a) {
        System.out.println(a.getUsername());
        a.setTasks(new ArrayList<>());
        users.add(a);
        writeIntoJsonFile();
    }

    public boolean validateFields(User a) {
        return a != null &&
                a.getFirstName() != null && !a.getFirstName().isEmpty() &&
                a.getLastName() != null && !a.getLastName().isEmpty() &&
                a.getEmail() != null && !a.getEmail().isEmpty() &&
                a.getPassword() != null && !a.getPassword().isEmpty() &&
                a.getPhoneNumber() != null && !a.getPhoneNumber().isEmpty() &&
                a.getUsername() != null && !a.getUsername().isEmpty();
    }

    public User verifyLogin(String username, String password) {
        for (User user : users) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }

    public User logout(String username) {
        for (User user : users) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }
        return null;
    }

    public boolean authorizeUser(String username, String password) {
        for (User user : users) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
                return true;
            }
        }
        return false;
    }


    public void addTask(String username, Task t) {
        for (User u : users) {
            if (u.getUsername().equals(username)) {
                u.addTask(t);
                writeIntoJsonFile();
            }
        }
    }

    public void removeTask(String username, String id) {
        for (User u : users) {
            if (u.getUsername().equals(username)) {
                u.removeTask(id);
                writeIntoJsonFile();
            }
        }
    }

    public ArrayList <Task> getAllTasks(String username) {
        for (User u : users) {
            if (u.getUsername().equals(username)) {
                return u.getTasks();
            }
        }
        return null;
    }

    public void updateUserToNew (User u, User user) {
        u.setEmail(user.getEmail());
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setPassword(user.getPassword());
        u.setPhoneNumber(user.getPhoneNumber());
        u.setProfilePhoto(user.getProfilePhoto());
        writeIntoJsonFile();
    }

    public void updateTask(String username, String id, Task t) {
        for (User u : users) {
            if (u.getUsername().equals(username)) {
                for (Task task : u.getTasks()) {
                    if (task.getId().equals(id)) {
                        System.out.println(task.getId());
                        task.updateTask(t);
                        writeIntoJsonFile();
                    }
                }
            }
        }
    }

    public Task getTask(String username, String id) {
        for (User u : users) {
            if (u.getUsername().equals(username)) {
                for (Task task : u.getTasks()) {
                    if (task.getId().equals(id)) {
                        return task;
                    }
                }
            }
        }
        return null;
    }

    public void orderTasks(String username, ArrayList<Task> tasks) {
        for (User u : users) {
            if (u.getUsername().equals(username)) {
            u.getTasks().sort(Comparator.comparing(Task::getPriority,Comparator.reverseOrder()).thenComparing(Task::getInitialDate).thenComparing(Task::getFinalDate));
            }
        }
    }
}
