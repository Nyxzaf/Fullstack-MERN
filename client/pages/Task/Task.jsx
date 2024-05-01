import { useState } from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import TaskForm from "../../components/form/FormTask";
import { IMG_3, IMG_4 } from "../../assets/img/images";

export default function MediaCard() {
  const [showCreateTaskInput, setShowCreateTaskInput] = useState(false);

  const handleCreateClick = () => {
    setShowCreateTaskInput(true);
  };

  const handleSaveTask = (data) => {
    console.log("Datos de la tarea:", data);
    setShowCreateTaskInput(false);
  };

  return (
    <Grid container spacing={2} justifyContent="center" mt={10}>
      <Grid item>
        <Card sx={{ maxWidth: 300, boxShadow: "0px 8px 8px -4px rgba(0, 0, 0, 0.5)" }}>
          <CardContent>
            <Box borderBottom={8} borderColor="transparent">
              <Box borderTopLeftRadius={4} borderTopRightRadius={4} overflow="hidden" borderRadius={3}>
                <img
                  src={IMG_3}
                  width={300}
                  height={150}
                  alt="Imagen 3"
                />
              </Box>
            </Box>
            <Typography gutterBottom variant="h5" component="div">
              Crear Nueva Tarea
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Haz clic en agregar tarea para comenzar a crear una nueva tarea.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleCreateClick}>
              Agregar Tarea
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ maxWidth: 300, boxShadow: "0px 8px 8px -4px rgba(0, 0, 0, 0.5)" }}>
          <CardContent>
            <Box borderBottom={8} borderColor="transparent">
              <Box borderTopLeftRadius={4} borderTopRightRadius={4} overflow="hidden" borderRadius={3}>
                <img
                  src={IMG_4}
                  width={300}
                  height={150}
                  alt="Imagen 4"
                />
              </Box>
            </Box>
            <Typography gutterBottom variant="h5" component="div">
              Editar o eliminar tarea
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Puedes editar o eliminar tarea dándole clic al botón correspondiente.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleCreateClick}>
              Editar tarea
            </Button>
            <Button size="small" color="error" onClick={handleCreateClick}>
              Eliminar tarea
            </Button>
          </CardActions>
        </Card>
      </Grid>

      {showCreateTaskInput && (
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <TaskForm onSave={handleSaveTask} />
        </Grid>
      )}
    </Grid>
  );
}

