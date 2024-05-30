import { Box, Card, Dialog, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FONT_FAMILY } from '../../assets/fonts/FontFamily';
import { useEffect, useState } from 'react';
import { UseEmployee } from '../../context/EmployeeContext';
import Alert from '../alerts/Alert';
import TaskForm from '../form/TaskForm';

const CardTask = ({ title, description, employeeId, taskId }) => {
  const { getEmployee, getTask, deleteTask } = UseEmployee(); 
  const [employees, setEmployees] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentTask, setCurrentTask] = useState();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleConfirmDelete =  () => {
    deleteTask(taskId, () => {
      setShowAlert(false);
    });
  };

  const handleEditData = (taskId) => {
    getTask(taskId).then((task) => {
      setCurrentTask(task);
      setShowTaskForm(true);
    });
  };

  useEffect(() => {
    if (employeeId && employeeId.length > 0) {  
      Promise.all(employeeId.map(id => getEmployee(id)))
        .then(data => {
          setEmployees(data);
        })
        .catch(error => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [employeeId]);

  return (
    <>
      <Card sx={{ borderRadius: "15px", p: 1.5, border: '3px solid lightgreen' }}>
        <Box display={'flex'} justifyContent="space-between" alignItems={"center"}>
          <Typography fontSize={14} color={'gray'} fontFamily={FONT_FAMILY}>
            {employees.map(emp => `${emp.Name.split(' ')[0]} ${emp.LastName.split(' ')[0]}`).join(', ')}
          </Typography>
          <Box>
            <IconButton onClick={() => handleEditData(taskId)}>
              <EditIcon sx={{ fontSize: 17 }} />
            </IconButton>
            <IconButton onClick={() => setShowAlert(true)}>
              <DeleteIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body1" fontSize={20} component="div" color={"lightgreen"} fontWeight={"bold"} fontFamily={FONT_FAMILY}>
          {title}
        </Typography>
        <Typography fontSize={15} variant="body1" component="div" fontFamily={FONT_FAMILY}>
          {description}
        </Typography>
        <Typography fontSize={15} fontFamily={FONT_FAMILY}>
          28/03/2001
        </Typography>
      </Card>
      <Alert
        dialog="Are you sure you want to eliminate this employee?"
        open={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleConfirmDelete}
      />
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={showTaskForm}
        onClose={() => setShowTaskForm(false)}
      >
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          taskToEdit={currentTask}
        />
      </Dialog>
    </>
  );
};

CardTask.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  employeeId: PropTypes.arrayOf(PropTypes.string).isRequired,
  taskId: PropTypes.string.isRequired
};

export default CardTask;
