import DrawerHome from '../src/pages/home/DrawerHome';
import Home from '../src/pages/home/Home';
import { Box, Fab, List, ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from '../src/components/header/Header';
import EmployeeData from '../src/pages/employeeData/EmployeeData';
import Calendar from '../src/pages/calendar/Calendar';
import { EmployeeContext } from '../src/context/EmployeeContext';
import InformationPage from '../src/pages/infoEmployee/InformationPage';
import TaskDragAndDrop from '../src/pages/task/TaskDragAndDrop';
import HelpIcon from '@mui/icons-material/Help';
import { useState } from 'react';
import DraftsIcon from '@mui/icons-material/Drafts';

function App() {
  const [showPopover, setShowPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopper = (e) => {
    setAnchorEl(e.currentTarget);
    setShowPopover((prev) => !prev);
  };

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
        <Fab 
          color="primary" 
          style={{ position: 'absolute', bottom: 16, right: 35 }}
          onClick={handlePopper}
        >
          <HelpIcon />
        </Fab>
        <Popover
          sx={{ transform: 'translate(-30px, -5px)' }}
          open={showPopover}
          anchorEl={anchorEl}
          onClose={() => setShowPopover(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Box
          width={"230px"}
          >
            <List component="nav">
              <ListItemButton sx={{py:0.5}}>
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="technical support" />
              </ListItemButton>
              <ListItemButton sx={{py:0.5}}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="email" />
              </ListItemButton>
            </List>
          </Box>
        </Popover>
      </DrawerHome>
    </>
  );
}

export default App;