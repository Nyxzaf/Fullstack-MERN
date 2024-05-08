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
import PropTypes from 'prop-types'

export default function Alert({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography
          variant="h6"
          fontFamily={FONT_FAMILY}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <WarningIcon sx={{ mr: 1 }} /> Confirmation
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontFamily={FONT_FAMILY}>
          Are you sure you want to eliminate this task?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pr: 2, pb: 2 }}>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="outlined">
          Yes, I am sure
        </Button>
      </DialogActions>
    </Dialog>
  );
}
Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};





