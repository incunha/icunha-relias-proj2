package aor.paj.dto;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class User {

    String username;
    String password;
    String email;
    String firstName;
    String lastName;
    int phoneNumber;

    String profilePhoto;

    public User () {

    }

    public User(String username, String password, String email, String firstName, String lastName, int phoneNumber, String profilePhoto) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.profilePhoto = profilePhoto;
    }

    @XmlElement
    public String getUsername() {
        return username;
    }

    @XmlElement
    public String getPassword() {
        return password;
    }

    @XmlElement
    public String getEmail() {
        return email;
    }

    @XmlElement
    public String getFirstName() {
        return firstName;
    }
    @XmlElement
    public String getLastName() {
        return lastName;
    }
    @XmlElement
    public int getPhoneNumber() {
        return phoneNumber;
    }
    @XmlElement
    public String getProfilePhoto() {
        return profilePhoto;
    }



}
