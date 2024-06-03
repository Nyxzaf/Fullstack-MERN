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
  Stack,
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
  const { getEmployeesAsLabels, createTask, updateTask, Employees } = UseEmployee();

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
        employeeIds: taskToEdit.employeeIds.map((employeeId) => ({
          value: employeeId,
          label: getEmployeeNameById(employeeId),
        })),
      });
    }
  }, [taskToEdit]);

  const getEmployeeNameById = (employeeId) => {
    const employee = Employees.find((emp) => emp._id === employeeId);
    return employee ? `${employee.Name} ${employee.LastName}` : "";
  };

  const isOptionEqualToValue = (option, value) => {
    return option.value === value.value;
  };

  const handleSubmit = (values, actions) => {
    console.log(values)
    const requestData = {
      ...values,
      employeeIds: values.employeeIds.map((employee) => employee.value),
    };

    if (taskToEdit) {
      updateTask(taskToEdit._id, requestData, () => {
        actions.setSubmitting(false);
        onClose();
      }, (error) => {
        console.error('Error updating task:', error);
        actions.setSubmitting(false);
      });
    } else {
      createTask(requestData, () => {
        actions.setSubmitting(false);
        onClose();
      }, (error) => {
        console.error('Error creating task:', error);
        actions.setSubmitting(false);
      });
    }
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
                    <Typography color={"#d32f2f"} fontSize={12} pl={2}>
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
                  limitTags={2}
                  options={getEmployeesAsLabels}
                  multiple
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) => {
                    setFieldValue("employeeIds", value);
                  }}
                  isOptionEqualToValue={isOptionEqualToValue}
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
              <Grid item xs={12}>
                <Stack spacing={2} direction="row" justifyContent="end">
                  <Button
                    color="primary"
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Save and Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

TaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  taskToEdit: PropTypes.object,
};

export default TaskForm;
