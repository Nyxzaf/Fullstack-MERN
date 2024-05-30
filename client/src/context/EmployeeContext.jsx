import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import {
  createEmployeeRequest,
  deleteEmployeeRequest,
  getEmployeeRequest,
  getEmployeesRequest,
  updateEmployeeRequest,
} from "../api/Employee";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, getTasksRequest, updateTaskRequest } from "../api/Tasks";



const Context = createContext();

export const UseEmployee = () => {
  const context = useContext(Context);
  return context;
};

export const EmployeeContext = ({ children }) => {
  const [Employees, setEmployees] = useState([]);
  const [taskEmployee, setTaskEmployee] = useState([]);


  const getEmployeesAsLabels = useMemo(() => {
    return Employees.map((employee) => ({
      value: employee._id,
      label: `${employee.Name} ${employee.LastName}`,
    }));
  }, [Employees]);

  const getEmployees = (onSuccess, onError) => {
    getEmployeesRequest()
      .then((res) => {
        setEmployees(res.data);
        onSuccess && onSuccess(res.data);
      })
      .catch(onError);
  };

  const getTasks = (onSuccess,onError) => {
    getTasksRequest()
    .then((res)=>{
      setTaskEmployee(res.data);
      onSuccess&& onSuccess(res.data)
    })
    .catch(onError)
  }

  const createEmployee = (employee, onSuccess, onError) => {
    return createEmployeeRequest(employee)
      .then((res) => {
        setEmployees([...Employees, res.data]);
        onSuccess && onSuccess(res.data);
      })
      .catch(onError);
  };

  const createTask = (task, onSuccess , onError)=> {
    return createTaskRequest(task)
    .then((res)=>{
      setTaskEmployee([...taskEmployee, res.data]);
      onSuccess && onSuccess(res.data);
      console.log(res.data);

    })
    .catch(onError);
  }

  const deleteEmployee = (id, onSuccess, onError) => {
    deleteEmployeeRequest(id)
      .then(() => {
        setEmployees(Employees.filter((employee) => employee._id !== id));
        onSuccess && onSuccess();
      })
      .catch(onError);
  };

  const deleteTask= (id, onSuccess , onError) =>{
    deleteTaskRequest(id)
    .then(()=>{
    setTaskEmployee(taskEmployee.filter((task)=> task._id !== id));
    onSuccess && onSuccess();
    })
    .catch(onError)
  }

  const updateEmployee = (id, employee, onSuccess, onError) => {
    updateEmployeeRequest(id, employee)
      .then((res) => {
        setEmployees(
          Employees.map((employee) =>
            employee._id == id ? res.data : employee
          )
        );
        onSuccess && onSuccess(res.data);
      })
      .catch(onError);
  };

  const updateTask = (id, task, onSuccess, onError) => {
    updateTaskRequest(id, task)
      .then((res) => {
        setTaskEmployee(
          taskEmployee.map((task) =>
            task._id == id ? res.data : task
          )
        );
        onSuccess && onSuccess(res.data);
      })
      .catch(onError);
  };

  const getEmployee = (id) => {
    return getEmployeeRequest(id).then((res) => res.data);
  };

  const getTask= (id) => {
    return getTaskRequest(id).then((res) => res.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);
  
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Context.Provider
      value={{
        Employees,
        getEmployeesAsLabels,
        setEmployees,
        getEmployees,
        createEmployee,
        deleteEmployee,
        getEmployee,
        updateEmployee,
        getTasks,
        createTask,
        taskEmployee,
        setTaskEmployee,
        deleteTask,
        updateTask,
        getTask
      }}
    >
      {children}
    </Context.Provider>
  );
};

EmployeeContext.propTypes = {
  children: PropTypes.node.isRequired,
};
