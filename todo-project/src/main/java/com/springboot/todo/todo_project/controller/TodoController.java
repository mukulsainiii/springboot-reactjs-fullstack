package com.springboot.todo.todo_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.todo.todo_project.Todo;
import com.springboot.todo.todo_project.service.TodoService;

@RestController
public class TodoController {
	
	@Autowired
private TodoService todoService;
	
	public TodoController(TodoService todoService) {
		super();
		this.todoService = todoService;
	}
	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username){
		return todoService.findByUsername(username);
	}
	
	@GetMapping("users/{username}/todos/{id}")
	public Todo retrieveOne(@PathVariable int id,@PathVariable String username) {
		return todoService.findById(id);
	}

	@DeleteMapping("/users/{username}/todos/{id}")
	public void deleteTodo(@PathVariable int id) {
		todoService.deleteById(id);
	}
	@PostMapping("/users/{username}/todos")
	public void addTodo(@RequestBody Todo todo) {
	  todoService.addTodo(todo.getUsername(),todo.getTitle(),todo.getDescription(),todo.getDueDate());
	}
	
	@PutMapping("users/{username}/todos/{id}")
	public Todo UpdateTodo(@PathVariable int id, @RequestBody Todo todo) {
		todoService.updateTodo(todo);
		return todo;
	}
	
}
