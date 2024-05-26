import axios from "axios";

export const getTasksRequest = async() => await axios.get('http://localhost:5000/tasks')
export const createTaskRequest = async(Task)=> await axios.post("http://localhost:5000/tasks",Task)
export const deleteTaskRequest = async ( id )=> await axios.delete('http://localhost:5000/tasks/' + id);
export const getTaskRequest = async ( id ) => await axios.get('http://localhost:5000/tasks/' + id)
export const updateTaskRequest = async(id, newfields) => await axios.put('http://localhost:5000/tasks/'+id, newfields)
export const getNameEmployeeRequest = async ( employees ) => await axios.get('http://localhost:5000/tasks/' + employees)
export const getTasksByEmployee = async ( employeeId ) => await axios.get('http://localhost:5000/tasks/employees/' + employeeId)