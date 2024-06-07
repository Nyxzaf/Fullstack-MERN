import axios from "axios";

const baseUrl = "http://localhost:5001/events";

export const getEventsRequest = () => axios.get(`${baseUrl}`);

export const createEventRequest = (event) => axios.post(`${baseUrl}`, event);

export const deleteEventRequest = (id) => axios.delete(`${baseUrl}/${id}`);

export const getEventRequest = (id) => axios.get(`${baseUrl}/${id}`);

export const updateEventRequest = (id, newfields) => 
  axios.put(`${baseUrl}/${id}`, newfields);

export const getNameEmployeeRequest = (employees) => 
  axios.get(`${baseUrl}/${employees}`);

export const getEventsByEmployee = (employeeId) =>
  axios.get(`${baseUrl}/employees/${employeeId}`);