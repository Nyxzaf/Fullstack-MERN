import DrawerHome from "../pages/home/DrawerHome";
import Home from "../pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Task from "../pages/task/Task";
import Header from "../components/header/Header";
import EmployeeData from "../pages/employeeData/EmployeeData";
import Calendar from "../pages/calendar/Calendar";
import { EmployeeContext } from "../context/EmployeeContext";
import InformationPage from "../pages/infoEmployee/InformationPage";

function App() {
  return (
    <>
      <DrawerHome>
        <Header />
          <EmployeeContext>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/data"
                element={
                    <EmployeeData />
                  }
                  />
              <Route path="/task" element={<Task />} />
              <Route path="/infoPage/:id" element={<InformationPage/>} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
              </EmployeeContext>
      </DrawerHome>
    </>
  );
}

export default App;
