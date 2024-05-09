import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily.js";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const validationSchema = Yup.object({
  Title: Yup.string().required("Title is required"),
  WorkHours: Yup.number()
    .required("Work hours are required")
    .min(0, "Work hours must be a positive number"),
  Severity: Yup.string().required("Severity is required"),
  Description: Yup.string().required("Description is required"),
  Date: Yup.date().required("Date is required"),
});

function TaskForm({ onSave, onClose, taskToEdit }) {
  const [initialValues, setInitialValues] = useState({
    Title: "",
    WorkHours: "",
    Severity: "",
    Description: "",
    Date: new Date(),
  });

  useEffect(() => {
    if (taskToEdit) {
      setInitialValues({
        Title: taskToEdit.Title,
        WorkHours: taskToEdit.WorkHours,
        Severity: taskToEdit.Severity,
        Description: taskToEdit.Description,
        Date: taskToEdit.Date,
      });
    } else {
      setInitialValues((prevValues) => ({
        ...prevValues,
        Date: new Date(),
      }));
    }
  }, [taskToEdit]);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Form values:", values);
    await onSave(values);
    setSubmitting(false);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "20px",
        borderRadius: "5px",
        fontFamily: FONT_FAMILY,
        backgroundColor: "#eafde6",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold" }}>Title</InputLabel>
                <Field
                  as={TextField}
                  label="Title"
                  name="Title"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { backgroundColor: "white" } }}
                  error={touched.Title && !!errors.Title}
                  helperText={touched.Title && errors.Title}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <InputLabel sx={{ fontWeight: "bold" }}>Work Hours</InputLabel>
                <Field
                  as={TextField}
                  label="Work Hours"
                  name="WorkHours"
                  type="number"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { backgroundColor: "white" } }}
                  error={touched.WorkHours && !!errors.WorkHours}
                  helperText={touched.WorkHours && errors.WorkHours}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <InputLabel sx={{ fontWeight: "bold" }}>Severity</InputLabel>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={touched.Severity && !!errors.Severity}
                >
                  <InputLabel>Severity</InputLabel>
                  <Field
                    as={Select}
                    name="Severity"
                    label="Severity"
                    style={{ backgroundColor: "white" }}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Field>
                  {touched.Severity && errors.Severity ? (
                    <Typography sx={{ color: "red" }}>
                      {errors.Severity}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold" }}>Description</InputLabel>
                <Field
                  as={TextField}
                  label="Description"
                  name="Description"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  InputProps={{ style: { backgroundColor: "white" } }}
                  error={touched.Description && !!errors.Description}
                  helperText={touched.Description && errors.Description}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold" }}>Date</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="Date"
                  value={initialValues.Date}
                  onChange={(date) => {
                    setFieldValue("Date", date);
                  }}
                  renderInput={({ inputProps, ...other }) => (
                    <TextField
                      {...other}
                      {...inputProps}
                      fullWidth
                      margin="normal"
                      error={touched.Date && !!errors.Date}
                      helperText={touched.Date && errors.Date}
                    />
                  )}
                />

                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" type="submit">
                  Save and Submit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="primary"
                  onClick={handleClose}
                  sx={{ backgroundColor: "#a2a9af" }}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

TaskForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  taskToEdit: PropTypes.object,
};

export default TaskForm;
