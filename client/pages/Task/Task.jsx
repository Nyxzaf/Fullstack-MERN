import { useState } from "react";
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  TablePagination,
  Paper,
  Typography,
  Dialog,
  Chip,
} from "@mui/material";
import TaskForm from "../../components/form/TaskForm";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import Alert from "../../components/alerts/Alert";


const rowsPerPage = 6;

// Mapear el valor de la severidad a su respectivo color
const severityColors = {
  low: "green",
  medium: "blue",
  high: "orange",
  critical: "red",
};

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [tableState, setTableState] = useState({
    page: 0,
    selectedTaskIds: [],
    selectedTask: null,
  });

  const handleAddTask = () => {
    setShowTaskForm(true);
    setTableState((prev) => ({
      ...prev,
      selectedTask: null,
    }));
  };

  const handleEditTask = () => {
    setShowTaskForm(true);
  };

  const handleDeleteTask = () => {
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    const updatedTasks = tasks.filter(
      (task) => !tableState.selectedTaskIds.includes(task.id)
    );
    setTasks(updatedTasks);
    setTableState((prev) => ({
      ...prev,
      selectedTaskIds: [],
    }));
    setShowAlert(false);
  };

  const handleChangePage = (event, newPage) => {
    setTableState((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleSelectTask = (taskId) => {
    if (tableState.selectedTaskIds.includes(taskId)) {
      setTableState((prev) => ({
        ...prev,
        selectedTaskIds: tableState.selectedTaskIds.filter((id) => id !== taskId),
      }));
    } else {
      setTableState((prev) => ({
        ...prev,
        selectedTaskIds: [taskId]
      }));
    }

    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTableState((prev) => ({
      ...prev,
      selectedTask: taskToEdit
    }));
  };

  const isSelected = (taskId) => tableState.selectedTaskIds.includes(taskId);

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setTableState((prev) => ({
      ...prev,
      selectedTask: null
    }));
  };

  const handleSaveTask = (data) => {
    if (tableState.selectedTask) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === tableState.selectedTask.id) {
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
    setTableState((prev) => ({
      ...prev,
      selectedTask: null,
      selectedTaskIds: [], // Limpiar los IDs de las tareas seleccionadas
    }));
  };

  return (
    <Grid item xl={10} xs={8} mx={24}>
      <Grid container spacing={4} ml={10}>
        <Grid item xl={12} xs={10} mt={2}>
          <Typography variant="h2" sx={{ fontFamily: FONT_FAMILY }}>
            Table Task
          </Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center" mt={1}>
          <Grid item marginLeft={4} xs={12}>
            <Button onClick={handleAddTask}>Add New Task</Button>
            <Button
              onClick={handleEditTask}
              disabled={tableState.selectedTaskIds.length !== 1}
            >
              Edit Task
            </Button>
            <Button
              onClick={handleDeleteTask}
              disabled={tableState.selectedTaskIds.length === 0}
              color="error"
            >
              Delete Task
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#339194" }}>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                      >
                        ID
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                      >
                        Title
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                      >
                        Work Hours
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                      >
                        Severity
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                      >
                        Description
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontFamily: FONT_FAMILY, color: "#FFFFFF" }}
                      >
                        Select
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? tasks.slice(
                        tableState.page * rowsPerPage,
                        tableState.page * rowsPerPage + rowsPerPage
                      )
                    : tasks
                  ).map((task) => (
                    <TableRow
                      key={task.id}
                      hover
                      onClick={() => handleSelectTask(task.id)}
                    >
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: FONT_FAMILY, fontWeight: "bold" }}
                        >
                          {task.id}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: FONT_FAMILY, fontWeight: "bold" }}
                        >
                          {task.Title}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: FONT_FAMILY, fontWeight: "bold" }}
                        >
                          {task.WorkHours}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={task.Severity}
                          style={{
                            backgroundColor: severityColors[task.Severity],
                            color: "white",
                            fontFamily: FONT_FAMILY,
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: FONT_FAMILY, fontWeight: "bold" }}
                        >
                          {task.Description}
                        </Typography>
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
              page={tableState.page}
              onPageChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={showTaskForm} onClose={handleCloseTaskForm}>
        <TaskForm
          onSave={handleSaveTask}
          onClose={handleCloseTaskForm}
          taskToEdit={tableState.selectedTask}
        />
      </Dialog>
      <Alert
        open={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleConfirmDelete}
      />
    </Grid>
  );
}