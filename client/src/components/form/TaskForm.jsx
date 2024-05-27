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
  Autocomplete,
  Box,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily.js";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { UseEmployee } from "../../context/EmployeeContext.jsx";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  severity: Yup.string().required("Severity is required"),
  employeeIds: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .required("Employee is required"),
  description: Yup.string().required("Description is required"),
});

function TaskForm({ onClose, taskToEdit }) {
  const { getEmployeesAsLabels , createTask } = UseEmployee();

  const [initialValues, setInitialValues] = useState({
    title: "",
    severity: "",
    employeeIds: [],
    description: "",
    Date: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setInitialValues({
        title: taskToEdit.title,
        severity: taskToEdit.severity,
        description: taskToEdit.description,
        employeeIds: taskToEdit.employeeIds,
        Date: taskToEdit.Date || new Date(),
      });
    }
  }, [taskToEdit]);

  const handleSubmit = (values, actions) => {
    const requestData = {
      ...values,
      employeeIds: values.employeeIds.map((employee) => employee.value),
    };
    createTask(requestData, () => {
      actions.setSubmitting(false);
      onClose();
    }, (error) => {
      console.error('Error creating task:', error);
      actions.setSubmitting(false);
    });
  };

  const handleClose = () => {
    onClose();
  };


  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "5px",
        fontFamily: FONT_FAMILY,
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
              <Grid item xs={8}>
                <InputLabel sx={{ fontWeight: "bold" }}>Title</InputLabel>
                <Field
                  as={TextField}
                  label="Title"
                  name="title"
                  fullWidth
                  margin="normal"
                  InputProps={{ style: { backgroundColor: "white" } }}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel sx={{ fontWeight: "bold" }}>Severity</InputLabel>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={touched.severity && !!errors.severity}
                >
                  <InputLabel>Severity</InputLabel>
                  <Field as={Select} name="severity" label="severity">
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Field>
                  {touched.severity && errors.severity ? (
                    <Typography sx={{ color: "red" }}>
                      {errors.severity}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold" }}>Employee</InputLabel>
                <Field
                  as={Autocomplete}
                  label="Employees"
                  name="employeeIds"
                  limitTags={3}
                  options={getEmployeesAsLabels}
                  multiple
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) => {
                    setFieldValue("employeeIds", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      label="Employee"
                      error={touched.employeeIds && !!errors.employeeIds}
                      helperText={touched.employeeIds && errors.employeeIds}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold" }}>Description</InputLabel>
                <Field
                  as={TextField}
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  InputProps={{ style: { backgroundColor: "white" } }}
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={6}>
                <Button color="primary" onClick={handleClose}>
                  Close
                </Button>
              </Grid>
              <Grid item display={"flex"} justifyContent={"flex-end"} xs={6}>
                <Button variant="contained" color="primary" type="submit">
                  Save and Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

TaskForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  taskToEdit: PropTypes.object,
};

export default TaskForm;
