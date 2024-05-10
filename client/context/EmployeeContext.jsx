import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  createEmployeeRequest,
  deleteEmployeeRequest,
  getEmployeeRequest,
  getEmployeesRequest,
  updateEmployeeRequest,
} from "../api/Employee";

const Context = createContext();

export const UseEmployee = () => {
  const context = useContext(Context);
  return context;
};

export const EmployeeContext = ({ children }) => {
  
  const [Employees, setEmployees] = useState([]);

  const getEmployees = (onSuccess, onError) => {
    getEmployeesRequest()
      .then((res) => {
        setEmployees(res.data);
        onSuccess && onSuccess(res.data);
      })
      .catch(onError);
  };

  const createEmployee = (employee, onSuccess, onError) => {
    return createEmployeeRequest(employee)
      .then((res) => {
        setEmployees([...Employees, res.data]);
        onSuccess && onSuccess(res.data);
        console.log(res.data);
      })
      .catch(onError);
  };

  const deleteEmployee = (id, onSuccess, onError) => {
    deleteEmployeeRequest(id)
      .then(() => {
        setEmployees(Employees.filter((employee) => employee._id !== id));
        onSuccess && onSuccess();
      })
      .catch(onError);
  };

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

  const getEmployee = (id) => {
    return getEmployeeRequest(id).then((res) =>res.data);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Context.Provider
      value={{
        Employees,
        setEmployees,
        getEmployees,
        createEmployee,
        deleteEmployee,
        getEmployee,
        updateEmployee,
      }}
    >
      {children}
    </Context.Provider>
  );
};


EmployeeContext.propTypes = {
  children: PropTypes.node.isRequired,
};
