import axios from "axios";

export const getTasksRequest = async() => await axios.get('http://localhost:5001/dragdrops')
export const createTaskRequest = async(Task)=> await axios.post("http://localhost:5001/dragdrops",Task)
export const deleteTaskRequest = async ( id )=> await axios.delete('http://localhost:5001/dragdrops/' + id);
export const getTaskRequest = async ( id ) => await axios.get('http://localhost:5001/dragdrops/' + id)
export const updateTaskRequest = async(id, newfields) => await axios.put('http://localhost:5001/dragdrops/'+id, newfields)
export const getNameEmployeeRequest = async ( employees ) => await axios.get('http://localhost:5001/dragdrops/' + employees)
export const getTasksByEmployee = async ( employeeId ) => await axios.get('http://localhost:5001/dragdrops/employees/' + employeeId)