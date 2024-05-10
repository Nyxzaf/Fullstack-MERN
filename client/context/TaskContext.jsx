import { createContext , useContext, useState ,useEffect } from "react";
import PropTypes from 'prop-types'
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from "../api/TaskApi";


const Context = createContext()

export const UseTask = ()=> {
    const context = useContext(Context)
    return context
}
// Task
export const TaskContext = ( { children }) => {
    const [Task, setTask] = useState([]);

const getTasks = async() =>{
    const res = await getTasksRequest()
    setTask(res.data);
}

const createTask = async (task) => {
    const res = await createTaskRequest(task)
    setTask([...Task,res.data]);
    }

const deleteTask = async (id) => {
    await deleteTaskRequest(id);
setTask(Task.filter(task => task._id !== id));
}

const updateTask = async (id, task)=>{
    const res = await updateTaskRequest(id,task)
    setTask(Task.map(task => task._id == id ? res.data : task))
}

const getTask = async (id) =>{
    const res = await getTaskRequest(id)
    return res.data
}

useEffect(() => {
    getTasks()
}, []);

return (
    <Context.Provider value={{ Task, setTask , getTasks , createTask ,deleteTask , getTask , updateTask }}>
        {children}
    </Context.Provider>
)}


TaskContext.propTypes = {
    children: PropTypes.node.isRequired
}