import Employee from "../models/employee.js";

export const GetEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error!!");
  }
};

export const CreateEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    return res.json(newEmployee);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error!!");
  }
};
// employee/:id = params
export const UpdateEmployee = async (req, res) => {
  try {
    const UpadateEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send(UpadateEmployee);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error!!");
  }
};

export const DeleteEmployee = async (req, res) => {
  try {
    const EmployeeRemoved = await Employee.findByIdAndDelete(req.params.id);
    if (!EmployeeRemoved) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error!!");
  }
};

export const GetEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.sendStatus(404);
    return res.json(employee);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error!!");
  }
};

export const GetBirthdayEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    console.log(error);
    return res.status(500).send("error!!");
  }
};
