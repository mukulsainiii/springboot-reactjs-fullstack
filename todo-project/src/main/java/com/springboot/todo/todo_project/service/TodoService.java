package com.springboot.todo.todo_project.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

import com.springboot.todo.todo_project.Todo;

@Service
public class TodoService {
	private static List<Todo> todos=new ArrayList<>();
	private static int count=0;
	
	static {
		todos.add(new Todo(++count,"mukul","Secure RESTful API","learn how to secure RESTful APIs",LocalDate.now().plusYears(2)));
		todos.add(new Todo(++count,"saini","Spring boot quick start","introduction to getting started with spring boot",LocalDate.now()));
	}

public List<Todo> findByUsername(String username){
	return todos;
}

public void addTodo(String username,String title,String description,LocalDate dueDate) {
	todos.add(new Todo(++count,username,title,description,dueDate));
	}


public void deleteById(int id) {
	Predicate<? super Todo> predicate= todo->todo.getId()==id;
	todos.removeIf(predicate);	
}

public Todo findById(int id) {
	Predicate<? super Todo> predicate=todo->todo.getId()==id;
	return todos.stream().filter(predicate).findFirst().get();
	
}

public void updateTodo(Todo todo) {
	deleteById(todo.getId());
	todos.add(todo);
}
}
