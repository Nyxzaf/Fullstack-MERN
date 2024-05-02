
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function Alert({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro que quieres eliminar esta tarea?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error">
          Sí, estoy seguro
        </Button>
      </DialogActions>
    </Dialog>
  );
}