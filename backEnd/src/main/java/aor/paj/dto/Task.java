package aor.paj.dto;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.time.LocalDate;

@XmlRootElement
public class Task {
    private String id;
    private String title;
    private String description;
    private int status;
    private LocalDate initialDate;
    private LocalDate finalDate;
    private int priority;
    public Task(){

    }

    public Task(String id, String title, String description, int status, LocalDate initialDate, LocalDate finalDate, int priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
        this.priority = priority;
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
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public void inicialStatus() {
        this.status = 100;
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

    @XmlElement
    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void updateTask(Task task) {
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.status = task.getStatus();
        this.priority = task.getPriority();
        this.initialDate = task.getInitialDate();
        this.finalDate = task.getFinalDate();
    }
}
