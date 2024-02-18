package com.scrum;

import java.time.LocalDate;

public class Task {
    private String title;
    private String description;
    private int priority;
    private LocalDate initialDate;
    private LocalDate finalDate;
    private String id;
    private int status;

    public Task() {
    }

    public Task(String title, String description, int priority, LocalDate initialDate, LocalDate finalDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
    }

    @Override
    public String toString() {
        return "{" +
                "\"title\":\"" + title + "\"" +
                ", \"description\":\"" + description + "\"" +
                ", \"priority\":" + priority +
                ", \"initialDate\":\"" + initialDate + "\"" +
                ", \"finalDate\":\"" + finalDate + "\"" +
                "}";
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public LocalDate getInitialDate() {
        return initialDate;
    }

    public void setInitialDate(LocalDate initialDate) {
        this.initialDate = initialDate;
    }

    public LocalDate getFinalDate() {
        return finalDate;
    }

    public void setFinalDate(LocalDate finalDate) {
        this.finalDate = finalDate;
    }


    public String getId() { return id;}

    public void setId(String id) { this.id = id;}


    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
