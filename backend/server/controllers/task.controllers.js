
import Task from "../models/task.js";


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send("error");
  }
};

export const getTasksByEmployeeId = async (req, res) => {
  try {
    const tasks = await Task.find({ EmployeeId: req.params.id });
    res.send(tasks);
  } catch (err) {
    res.status(500).send("error");
  }
}

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("error");
    }
    res.json(task);
  } catch (err) {
    res.status(500).send("error");
  }
};

export const createTask = async (req, res) => {
  try {
    const Createtask = new Task(req.body);
    await Createtask.save();
    return res.json(Createtask)
  } catch (err) {
    console.log(err)
    return res.status(500).send("error");
  }
};

export const updateTask = async (req, res) => {
  try {
    const UpdateTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:true,
      }
    );

      return res.send(UpdateTask);
  } catch (err) {
    console.log(err);
     return res.status(500).send("error");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const TaskRemoved = await Task.findById(req.params.id);
    if (!TaskRemoved) return res.sendstatus(404);
      return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(500).send("error");
  }
};