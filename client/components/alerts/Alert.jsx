import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import WarningIcon from "@mui/icons-material/Warning";

export default function Alert({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography fontFamily={FONT_FAMILY} sx={{ display: 'flex', alignItems: 'center' }}>
          <WarningIcon sx={{ mr: 1 }} /> Confirmation
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontFamily={FONT_FAMILY}>
          Are you sure you want to eliminate this task?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">
          Yes, I am sure
        </Button>
      </DialogActions>
    </Dialog>
  );
}
