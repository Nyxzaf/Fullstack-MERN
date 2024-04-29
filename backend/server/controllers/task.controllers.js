import Task from "../models/task.js";


  export const CreateTask = async (req, res) => {
    try {
      const newTask = new Task(req.body);
      await newTask.save();
      return res.json(newTask);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error creating task");
    }
  };
  
  export const UpdateTask = async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res.send(updatedTask);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error updating task");
    }
  };

  export const DeleteTask = async (req, res) => {
    try {
      const taskRemoved = await Task.findByIdAndDelete(req.params.id);
      if (!taskRemoved) return res.sendStatus(404);
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error deleting task");
    }
  };
  
