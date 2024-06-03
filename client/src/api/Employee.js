import axios from "axios";

const baseUrl = "http://localhost:5000/employees";

export const getEmployeesRequest = () => axios.get(`${baseUrl}`);

export const createEmployeeRequest = (Employee) =>
  axios.post(`${baseUrl}`, Employee);

export const deleteEmployeeRequest = (id) => axios.delete(`${baseUrl}/${id}`);

export const getEmployeeRequest = (id) => axios.get(`${baseUrl}/${id}`);

export const updateEmployeeRequest = (id, newfields) =>
  axios.put(`${baseUrl}/${id}`, newfields);
