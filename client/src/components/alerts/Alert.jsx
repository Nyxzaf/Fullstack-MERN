import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  } from "@mui/material";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily.js";
import WarningIcon from "@mui/icons-material/Warning";
import PropTypes from 'prop-types'

export default function Alert({ dialog, open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <WarningIcon sx={{ mr: 1 }} /> Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText fontFamily={FONT_FAMILY}>
          {dialog}
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
  onConfirm: PropTypes.func.isRequired,
  dialog:PropTypes.string.isRequired
};





