import {
  Box,
  Card,
  Dialog,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import { useEffect, useState } from "react";
import { UseEmployee } from "../../context/EmployeeContext";
import Alert from "../alerts/Alert";
import TaskForm from "../form/TaskForm";
import dayjs from "dayjs";
import { TaskStates, SEVERITY_COLORS } from "../../data/taskStates";

const CardTask = ({
  title,
  description,
  employeeId,
  taskId,
  severity,
  start,
  state,
  end,
}) => {
  const { getEmployee, getTask, deleteTask } = UseEmployee();
  const [employees, setEmployees] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentTask, setCurrentTask] = useState();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleConfirmDelete = () => {
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
      Promise.all(employeeId.map((id) => getEmployee(id)))
        .then((data) => {
          setEmployees(data);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  }, [employeeId]);

  const styles = SEVERITY_COLORS[severity] || {};

  const employeeNames = employees.map((emp) => `${emp.Name.split(" ")[0]} ${emp.LastName.split(" ")[0]}`)
    .join(", ");

  return (
    <>
      <Card
      component={"article"}
        sx={{ position: "relative", borderRadius: "15px", p: 1.5, ...styles }}
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center">
            {employees.length === 1 && (
              <Typography
                key={employees._id}
                fontSize={14}
                color="gray"
                fontFamily={FONT_FAMILY}
                mr={"auto"}
              >
                {`${employees[0].Name.split(" ")[0]} ${
                  employees[0].LastName.split(" ")[0]
                }`}
              </Typography>
            )}
            {employees.length > 1 && (
              <Tooltip
                title={
                  <Typography variant="subtitle2">{employeeNames}</Typography>
                }
                arrow
              >
                <Typography
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  fontSize={14}
                  color="gray"
                  fontFamily={FONT_FAMILY}
                  mr={"auto"}
                >
                    {employees
                      .map((employee) => employee.Name.split(" ")[0])
                      .join(", ")}
                </Typography>
              </Tooltip>
            )}
            <IconButton onClick={() => handleEditData(taskId)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => setShowAlert(true)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box flexGrow={1}>
            <Typography
              variant="h6"
              component="div"
              color={styles.color}
              fontWeight="bold"
              fontFamily={FONT_FAMILY}
            >
              {title}
            </Typography>
            <Typography
              fontSize={15}
              variant="body1"
              component="div"
              fontFamily={FONT_FAMILY}
              color="text.secondary"
            >
              {description}
            </Typography>
            {state !== TaskStates.BACKLOG && (
              <Typography
                fontSize={15}
                variant="body1"
                component="div"
                fontFamily={FONT_FAMILY}
                color={"black"}
              >
                {state === TaskStates.IN_PROGRESS
                  ? `Started at: ${dayjs(start).format("DD/MM/YYYY hh:mm")}`
                  : `Finished at: ${dayjs(end).format("DD/MM/YYYY hh:mm")}`}
              </Typography>
            )}
            <Typography fontWeight="500" variant="subtitle1">
              Severity: {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Typography>
          </Box>
        </Box>
      </Card>
      <Alert
        dialog="Are you sure you want to delete this employee?"
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
  start: PropTypes.string,
  end: PropTypes.string,
};

export default CardTask;
