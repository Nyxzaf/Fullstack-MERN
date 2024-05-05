import { createContext , useContext, useState ,useEffect } from "react";
import PropTypes from 'prop-types'
import { createEmployeeRequest, deleteEmployeeRequest, getEmployeeRequest, getEmployeesRequest, updateEmployeeRequest } from "../api/Employee";


const Context = createContext()

export const UseEmployee = ()=> {
    const context = useContext(Context)
    return context
}

export const EmployeeContext = ( { children }) => {

    const [Employees, setEmployees] = useState([]);
    
    const getEmployees = async() =>{
        const res = await getEmployeesRequest()
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

    const updateEmployee = async (id, employee)=>{
        const res = await updateEmployeeRequest(id,employee)
        setEmployees(Employees.map(employee => employee._id == id ? res.data : employee))
    }

    const getEmployee = async (id) =>{
        const res = await getEmployeeRequest(id)
        return res.data
    }

    useEffect(() => {
        getEmployees()
    }, []);
    
    return (
        <Context.Provider value={{ Employees, setEmployees , getEmployees , createEmployee ,deleteEmployee , getEmployee , updateEmployee }}>
            {children}
        </Context.Provider>
    )
}

EmployeeContext.propTypes = {
    children: PropTypes.node.isRequired
}


