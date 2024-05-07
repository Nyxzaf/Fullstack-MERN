import { Typography, Box, Dialog, Button } from "@mui/material";

const DescriptionModal = ({ open, description, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box p={2}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Description
        </Typography>
        <Box sx={{ border: "1px solid #ccc", minHeight: 200, mt: 2, p: 1, overflowY: "auto" }}>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{description}</Typography>
        </Box>
        <Box mt={2} textAlign="center">
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DescriptionModal;
