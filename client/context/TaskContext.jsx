import { createContext , useContext, useState ,useEffect } from "react";
import PropTypes from 'prop-types'
import { 
    createTaskRequest,
    deleteTaskRequest,
    getTaskRequest,
    getTasksRequest,
    updateTaskRequest 
} from "../api/TaskApi";


const Context = createContext()

export const UseTask = ()=> {
    const context = useContext(Context)
    return context
}
// Task

export const TaskContext = ( { children }) => {
    const [Task, setTask] = useState([]);

const getTasks = (onSuccess, onError) => {
    getTasksRequest()
    .then((res) => {
        setTask(res.data);
        onSuccess && onSuccess(res.data);
    })
    .catch(onError)
}

const createTask =  (task, onSuccess, onError) => {
    return createTaskRequest(task)
    .then((res) => {
        setTask([...Task, res.data]);
        onSuccess && onSuccess(res.data);
    })
    .catch(onError);
};

const deleteTask =  (id, onSuccess, onError) => {
    deleteTaskRequest(id)
    .then(() => {
        setTask(Task.filter((task) => task._id !== id));
        onSuccess && onSuccess();
    })
    .catch(onError);
  };

const updateTask = (id, task, onSuccess, onError) => {
    updateTaskRequest(id,task)
        .then((res) => {
         setTask(
          Task.map((task) =>
            task._id == id ? res.data : task
          )
         );
         onSuccess && onSuccess(res.data);
        })
        .catch(onError);
};

const getTask =  (id) => {
    return getTaskRequest(id).then((res) => res.data);
};

useEffect(() => {
    getTasks()
}, []);

return (
    <Context.Provider 
    value={{ 
        Task, 
        setTask, 
        getTasks, 
        createTask,
        deleteTask, 
        getTask, 
        updateTask 
        }}
    >
        {children}
    </Context.Provider>
)}


TaskContext.propTypes = {
    children: PropTypes.node.isRequired
}