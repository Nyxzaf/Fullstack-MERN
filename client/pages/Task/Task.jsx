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
import SendIcon from "@mui/icons-material/Send";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import TaskIcon from "@mui/icons-material/Task";
import DescriptionModal from "../../components/modal/DescriptionModal";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { COLOR_2 } from '../../assets/color/colors.js'
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
  const [selectedDescription, setSelectedDescription] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

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
            Date: data.Date,
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
        Date: data.Date,
      };
      setTasks([...tasks, newTask]);
      setShowTaskForm(false);
    }
  };

  const handleViewDescription = (description) => {
    setSelectedDescription(description);
    setShowDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
    setSelectedDescription("");
  };

  return (
    <Box>
      <Grid container spacing={7} bgcolor={COLOR_2}>
        <Grid item xl={12} mt={1}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: FONT_FAMILY,
              color: "#FFFFFF",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <PlaylistAddCheckIcon sx={{ fontSize: "inherit" }} />
            Table Task
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <Grid spacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={{ xs: 2 }}
              columns={{ xs: 7, sm: 5, md: 12 }}
            >
              <Grid item xs={5} mt={15}>
                <Box
                  sx={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      pr: 2,
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      fontFamily: FONT_FAMILY,
                      bgcolor: "#339194",
                      border: 1.5,
                      width: "200",
                      borderRadius: 2,
                      borderColor: "#FFFFFF",
                    }}
                  >
                    <TaskIcon sx={{ paddingTop: 0.9 }} /> Create Task
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontFamily: FONT_FAMILY }} mt={2}>
                  Welcome to the Task Table! Here you can view, edit, and delete tasks.
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: FONT_FAMILY }}>
                  Click on Add New Task  to create a new task.
                </Typography>
                <Grid item xs={12} mt={1}>
                  <Button
                    variant="outlined"
                    endIcon={<SendIcon />}
                    onClick={handleAddTask}
                  >
                    Add New Task
                  </Button>
                </Grid>
              </Grid>
              <Grid item mt={15} xs={7} pr={2}>
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
                            Date
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
                            <Button
                              variant="text"
                              color="primary"
                              startIcon={<VisibilityIcon />}
                              onClick={() => handleViewDescription(task.Description)}
                            >
                              Show Description
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              variant="body1"
                              sx={{ fontFamily: FONT_FAMILY, fontWeight: "bold" }}
                            >
                              {new Date(task.Date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                              <IconButton onClick={() => handleEditTask(task.id)} sx={{ marginRight: 3 }}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteTask(task.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
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
      </Box>
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
      <DescriptionModal
        open={showDescriptionModal}
        description={selectedDescription}
        onClose={handleCloseDescriptionModal}
      />
    </Box>
  );
}

