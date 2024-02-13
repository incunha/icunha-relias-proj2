package aor.paj.dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.time.LocalDate;

@XmlRootElement
public class Task {
    String id;
    String title;
    String description;
    String status;
    LocalDate initialDate;
    LocalDate finalDate;

    public Task(){

    }

    public Task(String id, String title, String description, String status, LocalDate initialDate, LocalDate finalDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
    }

    @XmlElement
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void createId() {
        this.id = "task"+(Math.random() * 1000);
    }

    @XmlElement
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void inicialStatus() {
        this.status = "todo";
    }

    @XmlElement
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @XmlElement
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @XmlElement
    public LocalDate getInitialDate() {
        return initialDate;
    }

    public void setInitialDate(LocalDate initialDate) {
        this.initialDate = initialDate;
    }

    @XmlElement
    public LocalDate getFinalDate() {
        return finalDate;
    }

    public void setFinalDate(LocalDate finalDate) {
        this.finalDate = finalDate;
     }

    public void updateTask(Task task) {
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.status = task.getStatus();
    }

}
