import { useEffect, useState } from "react";
import { retrieveAllForUsername } from "./API/HelloWorldApi";
import { deleteById } from "./API/HelloWorldApi";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent(){
    const[todos,setTodos]=useState([]);
    const[message,setMessage]=useState();
    const {username}=useAuth();
    const navigate=useNavigate();
    useEffect(()=>getTodo(),[])
    function getTodo(){
      retrieveAllForUsername(username)
      .then((response=>setTodos(response.data)))
      .catch((error=>console.log(error)))
      .finally(()=>console.log('clean up'))
    }
    function updateTodo(id){
      navigate(`/todo/${id}`)
    }
    function addNewTodo(){
      navigate('/todo/-1')
    }

    function deleteTodo(id){
      deleteById(username,id)
      .then(
        ()=>{
        setMessage('deleted')
        getTodo();
      }
      )
      .catch((error=>console.log(error)))
    }

    return (
      <div className='contain'>
        <h1>Your TODOS are Here:</h1>
        {message && <h4>{message}</h4>}
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>Username</th>
                <th>Title</th>
                <th>Description</th>
                <th>DueDate</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(
                todo=>(
                  <tr key={todo.id}>
                    <td>{todo.username}</td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>{new Date(todo.dueDate).toLocaleDateString()}</td>
                    <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                    <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="btn btn-success m-5" onClick={addNewTodo}>AddNew</div>
      </div>
    )
   }
  export default ListTodosComponent;