import { createContext , useContext, useState ,useEffect } from "react";
import PropTypes from 'prop-types'
import { createEmployeeRequest, deleteEmployeeRequest, getEmployeeRequest } from "../api/Employee";
const Context = createContext()

export const UseEmployee = ()=> {
    const context = useContext(Context)
    return context
}




export const EmployeeContext = ( { children }) => {

    const [Employees, setEmployees] = useState([]);
    

    const getEmployees = async() =>{
        const res = await getEmployeeRequest()
        setEmployees(res.data);
    }

    const createEmployee = async (employee) => {
        const res = await createEmployeeRequest(employee)
        setEmployees([...Employees,res.data]);
        }

    const deleteEmployee = async (id) => {
        await deleteEmployeeRequest(id);
    setEmployees(Employees.filter(employee => employee._id !== id));
    }

    useEffect(() => {
        getEmployees()
    }, []);
    
    return (
        <Context.Provider value={{ Employees, setEmployees , getEmployees , createEmployee ,deleteEmployee }}>
            {children}
        </Context.Provider>
    )
}

EmployeeContext.propTypes = {
    children: PropTypes.node.isRequired
}


