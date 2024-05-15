import axios from "axios";

export const getTasksRequest = async() => await axios.get('http://localhost:5000/dragdrops')
export const createTaskRequest = async(Task)=> await axios.post("http://localhost:5000/dragdrops",Task)
export const deleteTaskRequest = async ( id )=> await axios.delete('http://localhost:5000/dragdrops/' + id);
export const getTaskRequest = async ( id ) => await axios.get('http://localhost:5000/dragdrops/' + id)
export const updateTaskRequest = async(id, newfields) => await axios.put('http://localhost:5000/dragdrops/'+id, newfields)
export const getNameEmployeeRequest = async ( employees ) => await axios.get('http://localhost:5000/dragdrops/' + employees)