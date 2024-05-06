/*import axios from "axios";


export const getAllTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/task");
      return response.data;
    } catch (error) {
      console.error("Error al obtener todas las tareas:", error);
      throw error;
    }
  };
  
  export const createTask = async (task) => {
    try {
      const response = await axios.post("http://localhost:5000/task", task);
      return response.data;
    } catch (error) {
      console.error("Error al crear una nueva tarea:", error);
      throw error;
    }
  };
  
  export const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/task/${taskId}`, updatedTask);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      throw error;
    }
  };
  
  export const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/task/${taskId}`);
      return taskId;
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw error;
    }
  };*/
  