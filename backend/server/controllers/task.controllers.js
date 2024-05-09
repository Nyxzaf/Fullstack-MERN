
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
  const task = new Task({
    EmployeeId: req.body.EmployeeId,
    Title: req.body.Title,
    Description: req.body.Description,
    Severity: req.body.Severity,
    WorkHours: req.body.WorkHours
  });
  try {
    const newTask = await task.save();
    res.status(201).send(newTask);
  } catch (err) {
    res.status(400).send("error");
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("error");
    }
    Object.assign(task, req.body);
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).send("error");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("error");
    }
    await task.remove();
    res.send("error");
  } catch (err) {
    res.status(500).send("error");
  }
};