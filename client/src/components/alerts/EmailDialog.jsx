import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Resend } from "resend";
import PropTypes from 'prop-types';

const resend = new Resend(`re_HhhTHcZ6_Dw579Sz7penFKBaS3yGN1eMa`);

const EmailDialog = ({ onclose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    type: "",
    email: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [formData.email],
            subject: `Technical Support - ${formData.type}`,
            html: `<p>Hello ${formData.firstName} ${formData.lastName},</p><p>This is a test email regarding your ${formData.type} request.</p>`,
            });

        if (error) {
        console.error({ error });
        } else {
        console.log({ data });
        }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

  return (
    <>
      <Box position="absolute" right={0} p={1}>
        <IconButton onClick={onclose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box p={3}>
        <Typography align="center" variant="h5" component="h2" gutterBottom>
          Technical Support
        </Typography>
        <Typography variant="body2" component="h2" gutterBottom>
          Write your full name and select the type of assistance you need.
          Afterwards, we will send you an email with the necessary information.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="firstName"
            name="firstName"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Type"
            >
              <MenuItem value={"assistance"}>Assistance</MenuItem>
              <MenuItem value={"contact"}>Contact</MenuItem>
              <MenuItem value={"commentary"}>Commentary</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
            >
              Enviar
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

EmailDialog.propTypes = {
    onclose: PropTypes.func
};

export default EmailDialog;




