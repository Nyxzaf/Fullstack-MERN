import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
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
import { STATUS_TASK } from "../../data/ItemsTask";
import { COLOR_2 } from "../../assets/color/colors";
import TaskForm from "../../components/form/TaskForm";

const initialTasks = [
  { id: 1, name: "Angelo", type: "Backlog" },
  { id: 2, name: "Jose", type: "Backlog" },
  { id: 3, name: "Miguel", type: "Backlog" },
  { id: 4, name: "Pedro", type: "Backlog" },
  { id: 5, name: "Angel", type: "Backlog" },
  { id: 6, name: "Pablo", type: "Backlog" },
];

const TaskDragAndDrop = () => {
  const [tasks, setTasks] = useState([...initialTasks]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  const onDragEnd = (event) => {
    const { over, active } = event;
    setTasks(
      tasks.map((item) => {
        if (item.id === active.id) {
          return {
            ...item,
            type: over.id,
          };
        }

        return item;
      })
    );
  };

  const getTasks = (type) => tasks.filter((item) => item.type === type);

  return (
    <>
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
        <DndContext onDragEnd={onDragEnd}>
          <Grid container spacing={2}>
            {STATUS_TASK.map((item) => (
              <Grid item md={4} xs={12} key={item}>
                <Droppable key={item} id={item}>
                  <Paper sx={{ borderRadius: "20px", minHeight: "480px", mb: 2 }}>
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
                    <Grid container p={2} spacing={1}>
                      {getTasks(item).map((task) => (
                        <Grid item md={12} xs={6} key={task.id}>
                          <Draggable id={task.id}>
                            <CardTask user={task} />
                          </Draggable>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Droppable>
              </Grid>
            ))}
          </Grid>
        </DndContext>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={showTaskForm}
          onClose={handleCloseTaskForm}
        >
          <TaskForm
            onClose={handleCloseTaskForm}
            onSave={() => console.log("hola")}
          />
        </Dialog>
      </Container>
    </>
  );
};

export default TaskDragAndDrop;
