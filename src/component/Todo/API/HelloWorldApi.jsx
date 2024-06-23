import axios from "axios";

export const apiClient=axios.create(
    {
    baseURL:'http://localhost:8081'
    }
)
export const callHelloWorldRestApi=()=> apiClient.get('/hello-world')

export const retrieveAllForUsername=(username)=> apiClient.get(`/users/${username}/todos`)

export const  deleteById=(username,id)=> apiClient.delete(`/users/${username}/todos/${id}`)

export const retrieveTodo=(username,id)=> apiClient.get(`/users/${username}/todos/${id}`)

export const updateTodoApi=(username,id,todo)=> apiClient.put(`/users/${username}/todos/${id}`,todo)

export const createTodoApi=(username,todo)=> apiClient.post(`/users/${username}/todos`,todo)

export const executeBasicAuthenticationService=(token)=>apiClient.get(`/basicauth`,{
    headers:{
        Authorization:token
    }
})