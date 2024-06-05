import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Droppable from "../../components/card/Droppable";
import Draggable from "../../components/card/Draggable";
import {
  Button,
  Container,
  Dialog,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Title from "../../components/header/Title";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SendIcon from "@mui/icons-material/Send";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import CardTask from "../../components/card/CardTask";
import { TASK_STATES, TaskStates } from "../../data/taskStates";
import { COLOR_2 } from "../../assets/color/colors";
import TaskForm from "../../components/form/TaskForm";
import { UseEmployee } from "../../context/EmployeeContext";
import dayjs from "dayjs";

const TaskDragAndDrop = () => {
  const { taskEmployee, updateTask } = UseEmployee();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const onDragEnd = (event) => {
    const { over, active } = event;
    const task = taskEmployee.find((item) => item._id === active.id);

    if (task.state === over.id) {
      return;
    } else if (over.id === TaskStates.IN_PROGRESS) {
      updateTask(active.id, { state: over.id, startedAt: new dayjs() });
    } else if (over.id === TaskStates.DONE) {
      updateTask(active.id, {
        state: over.id,
        finishedAt: new dayjs(),
      });
    } else if (over.id === TaskStates.BACKLOG) {
      updateTask(active.id, {
        state: over.id,
        startedAt: null,
        finishedAt: null,
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getTasks = (state) =>
    taskEmployee
      .filter((item) => item.state === state)
      .toSorted((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <main>
      <Title title="Task" Icon={PlaylistAddCheckIcon} />
      <Container>
        <Typography variant="h5" my={2}>
          Here new tasks for employees are added.
        </Typography>
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          sx={{ mb: 3 }}
          onClick={() => setShowTaskForm(!showTaskForm)}
        >
          Add New Task
        </Button>
        <Grid container spacing={2}>
          <DndContext sensors={sensors} onDragEnd={onDragEnd}>
            {TASK_STATES.map((item) => (
              <Droppable key={item} id={item}>
                <Paper component={"section"} sx={{ borderRadius: "20px", minHeight: "480px", mb: 2 }}>
                  <Typography
                    borderRadius="22px 22px 0px 0px"
                    bgcolor={COLOR_2}
                    py={1}
                    fontFamily={FONT_FAMILY}
                    fontSize={30}
                    color={"white"}
                    align="center"
                  >
                    {item}
                  </Typography>
                  <Grid container p={1.5} spacing={1}>
                    {getTasks(item).map((task) => (
                      <Grid item md={12} sm={6} xs={12} key={task._id}>
                        <Draggable id={task._id}>
                          <CardTask
                            title={task.title}
                            description={task.description}
                            employeeId={task.employeeIds}
                            taskId={task._id}
                            severity={task.severity}
                            start={task.startedAt}
                            end={task.finishedAt}
                            state={task.state}
                          />
                        </Draggable>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Droppable>
            ))}
          </DndContext>
        </Grid>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={showTaskForm}
          onClose={() => setShowTaskForm(false)}
        >
          <TaskForm onClose={() => setShowTaskForm(false)} />
        </Dialog>
      </Container>
    </main>
  );
};

export default TaskDragAndDrop;
