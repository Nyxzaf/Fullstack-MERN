import { Box, Card, Dialog, IconButton, Typography, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FONT_FAMILY } from '../../assets/fonts/FontFamily';
import { useEffect, useState } from 'react';
import { UseEmployee } from '../../context/EmployeeContext';
import Alert from '../alerts/Alert';
import TaskForm from '../form/TaskForm';
import dayjs from "dayjs";

const severityColors = {
  low: { border: '3px solid blue', color: 'blue' },
  medium: { border: '3px solid lightgreen', color: 'green' },
  high: { border: '3px solid yellow', color: 'yellow' },
  critical: { border: '3px solid red', color: 'red' }
};

const CardTask = ({ title, description, employeeId, taskId, severity, start, state, end}) => {
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

  const styles = severityColors[severity] || {};

  const employeeNames = employees.map(emp => `${emp.Name.split(' ')[0]} ${emp.LastName.split(' ')[0]}`).join(', ');

  return (
    <>
      <Card sx={{ position: 'relative', borderRadius: "15px", p: 1.5, ...styles }}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flexDirection="column" flexGrow={1}>
              {employees.length > 0 && (
                <Typography key={employees._id} fontSize={14} color="gray" fontFamily={FONT_FAMILY}>
                  {`${employees[0].Name.split(' ')[0]} ${employees[0].LastName.split(' ')[0]}`}
                </Typography>
              )}
              {employees.length > 1 && (
                <Tooltip title={employeeNames} arrow>
                  <Typography fontSize={14} color="gray" fontFamily={FONT_FAMILY}>
                    ...
                  </Typography>
                </Tooltip>
              )}
            </Box>
            <Box>
              <IconButton onClick={() => handleEditData(taskId)}>
                <EditIcon sx={{ fontSize: 17 }} />
              </IconButton>
              <IconButton onClick={() => setShowAlert(true)}>
                <DeleteIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Box>
          </Box>
          <Box flexGrow={1}>
            <Typography variant="h6" component="div" color={styles.color} fontWeight="bold" fontFamily={FONT_FAMILY}>
              {title}
            </Typography>
            <Typography fontSize={15} variant="body1" component="div" fontFamily={FONT_FAMILY} color="text.secondary">
              {description}
            </Typography>
            {state !== 'Backlog' && (
              <Typography fontSize={15} variant="body1" component="div" fontFamily={FONT_FAMILY} color={'black'}>
                {state === 'In Progress' ? `start: ${dayjs(start).format('DD/MM/YYYY')}` : `end: ${dayjs(end).format('DD/MM/YYYY')}`}
              </Typography>
            )}
          </Box>
        </Box>
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
  taskId: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  start:PropTypes.string.isRequired,
  end:PropTypes.string.isRequired
};

export default CardTask;
