import Event from "../models/event.js";
import Employee from "../models/employee.js";

export const getEvents = async (req, res) => {
  try {
    const Events = await Event.find();
    res.send(Events);
  } catch (err) {
    res.status(500).send("error");
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("error");
    }
    return res.json(event);
  } catch (err) {
    res.status(500).send("error");
  }
};

export const getEventsByEmployee = async (req, res) => {
  try {
    const Events = await Event.find({ employeeIds: req.params.employeeId });
    res.send(Events);
  } catch (err) {
    res.status(500).send("error");
  }
};

export const getEventsByType = async (req, res) => {
  try {
    const Events = await Event.find({ type: req.params.type });
    res.send(Events);
  } catch (err) {
    res.status(500).send("error");
  }
};

export const createEvent = async (req, res) => {
  try {
    const CreateEvent = new Event(req.body);
    await CreateEvent.save();
    return res.json(CreateEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("error al crear la tabla");
  }
};

export const updateEvent = async (req, res) => {
  try {
    const UpdateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.send(UpdateEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).send("error");
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const EventId = req.params.id;
    const result = await Event.deleteOne({ _id: EventId });
    if (result.deletedCount === 0) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error deleting Event");
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
