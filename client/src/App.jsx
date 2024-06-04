import DrawerHome from '../src/pages/home/DrawerHome';
import Home from '../src/pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import Header from '../src/components/header/Header';
import EmployeeData from '../src/pages/employeeData/EmployeeData';
import Calendar from '../src/pages/calendar/Calendar';
import { EmployeeContext } from '../src/context/EmployeeContext';
import InformationPage from '../src/pages/infoEmployee/InformationPage';
import TaskDragAndDrop from '../src/pages/task/TaskDragAndDrop';

function App() {
  return (
    <>
      <DrawerHome>
        <Header />
        <EmployeeContext>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<EmployeeData />} />
            <Route path="/task" element={<TaskDragAndDrop />} />
            <Route path="/infoPage/:id" element={<InformationPage />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </EmployeeContext>
      </DrawerHome>
    </>
  );
}

export default App;
