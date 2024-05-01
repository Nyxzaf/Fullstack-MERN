import { useState } from "react";
import { Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TablePagination, Paper, Typography, Dialog } from "@mui/material";
import TaskForm from "../../components/form/TaskForm";
import { FONT_FAMILY } from '../../assets/Fonts/FontFamily'; 

const rowsPerPage = 6;

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  const handleAddTask = () => {
    setShowTaskForm(true);
  };

  const handleEditTask = () => {

  };

  const handleDeleteTask = () => {

  };

  const handleSaveTask = (data) => {
    const newTask = {
      id: tasks.length + 1,
      title: data.title,
      workHours: data.workHours,
      severity: data.severity,
      description: data.description,
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSelectTask = (taskId) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds(selectedTaskIds.filter(id => id !== taskId));
    } else {
      setSelectedTaskIds([...selectedTaskIds, taskId]);
    }
  };

  const isSelected = (taskId) => selectedTaskIds.includes(taskId);

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  return (
    <>
      <Grid item xl={10} xs={8}> 
        <Grid container spacing={3} ml={10}>
          <Grid item xl={12} xs={10} my={5}>
            <Typography variant="h2" style={{ fontFamily: FONT_FAMILY }}>Table Task</Typography>
          </Grid>
          <Grid container spacing={2} justifyContent="center" mt={5}>
            <Grid item xs={12}>
              <Button onClick={handleAddTask}>Agregar Nueva Tarea</Button>
              <Button onClick={handleEditTask} disabled={selectedTaskIds.length !== 1}>
                Editar Tarea
              </Button>
              <Button onClick={handleDeleteTask} disabled={selectedTaskIds.length === 0} color="error">
                Eliminar Tarea
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} style={{ width: '95%', margin: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#339194' }}>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Título</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Horas de Trabajo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Severidad</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Descripción</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold" style={{ fontFamily: FONT_FAMILY, color: '#FFFFFF' }}>Seleccionar</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : tasks
                    ).map((task) => (
                      <TableRow key={task.id} hover onClick={() => handleSelectTask(task.id)}>
                        <TableCell><Typography variant="body1" style={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.id}</Typography></TableCell>
                        <TableCell><Typography variant="body1" style={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.title}</Typography></TableCell>
                        <TableCell><Typography variant="body1" style={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.workHours}</Typography></TableCell>
                        <TableCell><Typography variant="body1" style={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.severity}</Typography></TableCell>
                        <TableCell style={{ Width: '500px' }}>
                          <Typography variant="body1" style={{ fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{task.description}</Typography>
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
      </Grid>
      <Dialog open={showTaskForm} onClose={handleCloseTaskForm}>
        <TaskForm onSave={handleSaveTask} onClose={handleCloseTaskForm} />
      </Dialog>
    </>
  );
}
