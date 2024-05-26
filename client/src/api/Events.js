import axios from "axios";

export const getEventRequest = async() => await axios.get('http://localhost:5001/event')
export const createEventRequest = async(Task)=> await axios.post("http://localhost:5001/event",Task)
export const deleteEventRequest = async ( id )=> await axios.delete('http://localhost:5001/event/' + id);
export const getEventsRequest = async ( id ) => await axios.get('http://localhost:5001/event/' + id)
export const updateEventRequest = async(id, newfields) => await axios.put('http://localhost:5001/event/'+id, newfields)