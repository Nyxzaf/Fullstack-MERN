
import DragDrops from "../models/dragAndDrop.js";
import Employee from "../models/employee.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await DragDrops.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send("error");
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await DragDrops.findById(req.params.id);
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
    const Createtask = new DragDrops(req.body);
    await Createtask.save();
    return res.json(Createtask)
  } catch (err) {
    console.log(err)
    return res.status(500).send("error al crear la tabla");
  }
};

export const updateTask = async (req, res) => {
  try {
    const UpdateTask = await DragDrops.findByIdAndUpdate(
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
    const taskId = req.params.id;
    const result = await DragDrops.deleteOne({ _id: taskId });
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