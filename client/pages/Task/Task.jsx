import { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Dialog,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import TaskForm from "../../components/form/TaskForm";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import Alert from "../../components/alerts/Alert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const rowsPerPage = 6;

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

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/task");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = () => {
    setShowTaskForm(true);
    setTableState((prev) => ({
      ...prev,
      selectedTask: null,
    }));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTableState((prev) => ({
      ...prev,
      selectedTask: taskToEdit,
    }));
    setShowTaskForm(true);
  };

  const handleDeleteTask = (taskId) => {
    setTableState((prev) => ({
      ...prev,
      selectedTaskIds: [taskId],
    }));
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

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setTableState((prev) => ({
      ...prev,
      selectedTask: null,
      selectedTaskIds: [],
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
      setShowTaskForm(false);
    } else {
      const newTask = {
        id: tasks.length + 1,
        Title: data.Title,
        WorkHours: data.WorkHours,
        Severity: data.Severity,
        Description: data.Description,
      };
      setTasks([...tasks, newTask]);
      setShowTaskForm(false);
    }
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" sx={{ fontFamily: FONT_FAMILY }}>
            Table Task
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleAddTask}>Add New Task</Button>
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
                      Actions
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
                  <TableRow key={task.id} hover>
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
                      <IconButton onClick={() => handleEditTask(task.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteTask(task.id)}>
                        <DeleteIcon />
                      </IconButton>
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
    </Box>
  );
}
