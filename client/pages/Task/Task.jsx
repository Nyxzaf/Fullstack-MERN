import { useState } from 'react';
import { Grid, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos de Quill

export default function MediaCard() {
  const [showCreateTaskInput, setShowCreateTaskInput] = useState(false);
  const [text, setText] = useState('');

  const handleCreateClick = () => {
    setShowCreateTaskInput(true);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Crear Tarea"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Crear Nueva Tarea
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Haz clic en agregar tarea para comenzar a crear una nueva tarea.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleCreateClick}>Agregar Tarea</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Editar y/o Eliminar Tareas"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Editar y/o Eliminar Tareas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Selecciona una tarea para editar su información o eliminarla.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Editar</Button>
            <Button size="small" color="error">Eliminar</Button>
          </CardActions>
        </Card>
      </Grid>

      {/* Cuadro de texto para crear tarea */}
      {showCreateTaskInput && (
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <ReactQuill value={text} onChange={setText} />
        </Grid>
      )}
    </Grid>
  );
}