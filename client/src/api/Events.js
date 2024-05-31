import axios from "axios";

const baseUrl = "http://localhost:5001/events";

export const getEventRequest = () => axios.get(`${baseUrl}`);

export const createEventRequest = (Task) => axios.post(`${baseUrl}`, Task);

export const deleteEventRequest = (id) => axios.delete(`${baseUrl}/${id}`);

export const getEventsRequest = (id) => axios.get(`${baseUrl}/${id}`);

export const updateEventRequest = (id, newfields) =>
  axios.put(`${baseUrl}/${id}`, newfields);
