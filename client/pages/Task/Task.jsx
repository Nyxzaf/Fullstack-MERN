import { useState } from "react";
import { Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TablePagination, Paper, Typography, Dialog } from "@mui/material";
import TaskForm from "../../components/form/TaskForm";
import { FONT_FAMILY } from '../../assets/fonts/FontFamily'; 

const rowsPerPage = 6;

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = () => {
    setShowTaskForm(true);
    setSelectedTask(null); 
  };

  const handleEditTask = () => {
    setShowTaskForm(true);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter(task => !selectedTaskIds.includes(task.id));
    setTasks(updatedTasks);
    setSelectedTaskIds([]);
  };

  const handleSaveTask = (data) => {
    if (selectedTask) {
      const updatedTasks = tasks.map(task => {
        if (task.id === selectedTask.id) {
          return {
            ...task,
            Title: data.Title,
            WorkHours: data.WorkHours,
            Severity: data.Severity,
            Description: data.Description,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: tasks.length + 1,
        Title: data.Title,
        WorkHours: data.WorkHours,
        Severity: data.Severity,
        Description: data.Description,
      };
      setTasks([...tasks, newTask]);
    }
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectTask = (taskId) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId));
    } else {
      setSelectedTaskIds([taskId]);
    }

    const taskToEdit = tasks.find(task => task.id === taskId);
    setSelectedTask(taskToEdit);
  };

  const isSelected = (taskId) => selectedTaskIds.includes(taskId);

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  return (
      <Grid item xl={10} xs={8} mx={24}> 
        <Grid container spacing={4} ml={10}>
          <Grid item xl={12} xs={10} mt={2}>
            <Typography variant="h2" sx={{ fontFamily: FONT_FAMILY }}>Table Task</Typography>
          </Grid>
          <Grid container spacing={2} justifyContent="center" mt={1}>
            <Grid item marginLeft={4} xs={12}>
              <Button onClick={handleAddTask}>Add New Task</Button>
              <Button onClick={handleEditTask} disabled={selectedTaskIds.length !== 1}>
                Edit Task
              </Button>
              <Button onClick={handleDeleteTask} disabled={selectedTaskIds.length === 0} color="error">
                Delete Task
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} >
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#339194' }}>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Title</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Work Hours</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Severity</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Description</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Select</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : tasks
                    ).map((task) => (
                      <TableRow key={task.id} hover onClick={() => handleSelectTask(task.id)}>
                        <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.id}</Typography></TableCell>
                        <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.title}</Typography></TableCell>
                        <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.workHours}</Typography></TableCell>
                        <TableCell><Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.severity}</Typography></TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.description}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Checkbox checked={isSelected(task.id)} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={tasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </Grid>
          </Grid>
        </Grid>
        <Dialog open={showTaskForm} onClose={handleCloseTaskForm}>
          <TaskForm onSave={handleSaveTask} onClose={handleCloseTaskForm} taskToEdit={selectedTask} />
        </Dialog>
      </Grid>
  );
}
