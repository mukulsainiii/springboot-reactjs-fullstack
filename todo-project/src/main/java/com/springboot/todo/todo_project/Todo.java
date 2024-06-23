package com.springboot.todo.todo_project;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Todo {
	
	    @Id
	    private Integer id;
	    private String username;
	    private String title;
	    private String description;
	    private LocalDate dueDate;
	    
	    public Todo() {
	        // default constructor
	    }

	    public Todo(Integer id, String username, String title, String description, LocalDate dueDate) {
	        this.id = id;
	        this.username = username;
	        this.title = title;
	        this.description = description;
	        this.dueDate = dueDate;
	    }

	    // getters and setters

	    public Integer getId() {
	        return id;
	    }

	    public void setId(Integer id) {
	        this.id = id;
	    }

	    public String getUsername() {
	        return username;
	    }

	    public void setUsername(String username) {
	        this.username = username;
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

	    public LocalDate getDueDate() {
	        return dueDate;
	    }

	    public void setDueDate(LocalDate dueDate) {
	        this.dueDate = dueDate;
	    }

	    @Override
	    public String toString() {
	        return "Todo [id=" + id + ", username=" + username + ", title=" + title + ", description=" + description + ", dueDate=" + dueDate + "]";
	    }
	}

