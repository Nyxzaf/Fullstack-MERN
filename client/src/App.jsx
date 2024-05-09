import DrawerHome from "../pages/home/DrawerHome";
import Home from "../pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Task from "../pages/task/Task";
import Header from "../components/header/Header";
import EmployeeData from "../pages/employeeData/EmployeeData";
import Calendar from "../pages/calendar/Calendar";
import GeneralTable from "../pages/generalTable/GeneralTable";
import { EmployeeContext } from "../context/EmployeeContext";

function App() {
  return (
    <>
      <DrawerHome>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/data"
            element={
              <EmployeeContext>
                <EmployeeData />
              </EmployeeContext>
            }
          />
          <Route path="/task" element={<Task />} />
          <Route path="/tables" element={<GeneralTable />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </DrawerHome>
    </>
  );
}

export default App;
