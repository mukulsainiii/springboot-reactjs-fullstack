package com.springboot.todo.todo_project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.todo.todo_project.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Integer>{

	public List<Todo> findByUsername(String username);

}
