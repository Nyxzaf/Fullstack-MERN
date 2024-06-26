import Task from "../models/task.js";
import Employee from "../models/employee.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send("error");
  }
};

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

export const getTaskByEmployee = async (req, res) => {
  try {
    const tasks = await Task.find({ employeeIds: req.params.employeeId });
    res.send(tasks);
  } catch (err) {
    res.status(500).send("error");
  }
};

export const createTask = async (req, res) => {
  try {
    const Createtask = new Task(req.body);
    await Createtask.save();
    return res.json(Createtask);
  } catch (err) {
    console.log(err);
    return res.status(500).send("error al crear la tabla");
  }
};

export const updateTask = async (req, res) => {
  try {
    const UpdateTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
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
    const taskId = req.params.id;
    const result = await Task.deleteOne({ _id: taskId });
    if (result.deletedCount === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error deleting task");
  }
};

export const getNameEmployee = async (req, res) => {
  try {
    const activeEmployees = await Employee.distinct("Name", { Active: true });
    res.send(activeEmployees);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving employee names");
  }
};
