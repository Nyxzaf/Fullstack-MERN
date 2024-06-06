import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  Checkbox,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UseEmployee } from "../../context/EmployeeContext.jsx";
import dayjs from "dayjs";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Severity is required"),
  employeeIds: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    )
    .required("Employee is required"),
  description: Yup.string().required("Description is required"),
  start:Yup.date().required("Time Start is required"),
  end: Yup.date().required("Time End is required"),
  location: Yup.string().required("Location is required"),
  locationUrl: Yup.string().required("Location Url is required"),
});

function EventForm({ onClose, closeForm ,  eventToEdit, time }) {
  const { getEmployeesAsLabels , createEvent , updateEvent, Employees } = UseEmployee();

  const [initialValues, setInitialValues] = useState({
    title: "",
    type: "",
    employeeIds: [],
    description: "",
    start: time.start ? dayjs(time.start).format("YYYY-MM-DDTHH:mm") : "",
    end:  time.end ? dayjs(time.end).subtract(1, 'seg').format("YYYY-MM-DDTHH:mm") : "",
    location:"",
    locationUrl:""
  });

  useEffect(() => {
    if (eventToEdit) {
      setInitialValues({
        title: eventToEdit.title,
        type: eventToEdit.type,
        description: eventToEdit.description,
        employeeIds: eventToEdit.employeeIds.map((employeeId) => ({
          value: employeeId,
          label: getEmployeeNameById(employeeId),
        })),
        start:dayjs(eventToEdit.start).format("YYYY-MM-DDTHH:mm"),
        end:dayjs(eventToEdit.end).subtract(1, 'seg').format("YYYY-MM-DDTHH:mm"),
        location:eventToEdit.location,
        locationUrl:eventToEdit.locationUrl
      });
    }
    
  }, [eventToEdit]);

  const getEmployeeNameById = (employeeId) => {
    const employee = Employees.find((emp) => emp._id === employeeId);
    return employee ? `${employee.Name} ${employee.LastName}` : "";
  };

  const isOptionEqualToValue = (option, value) => {
    return option.value === value.value;
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    const requestData = {
      ...values,
      employeeIds: values.employeeIds.map((employee) => employee.value),
    };

    if (eventToEdit) {
      updateEvent(eventToEdit._id, requestData, () => {
        actions.setSubmitting(false);
        onClose();
      }, (error) => {
        console.error('Error updating event:', error);
        actions.setSubmitting(false);
      });
    } else {
      createEvent(requestData, () => {
        actions.setSubmitting(false);
        closeForm()
      }, (error) => {
        console.error('Error creating event:', error);
        actions.setSubmitting(false);
      });
    }
  };
  

  return (
    <Box
        p={3}
      sx={{
        borderRadius: "5px",
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
                <InputLabel sx={{ fontWeight: "bold" }}>Event</InputLabel>
                <FormControl
                  fullWidth
                  margin="normal"
                  error={touched.type && !!errors.type}
                >
                  <InputLabel>Event</InputLabel>
                  <Field as={Select} name="type" label="event">
                    <MenuItem value="conference">Conference</MenuItem>
                    <MenuItem value="interview">Interview</MenuItem>
                    <MenuItem value="integration event">Integration Event</MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                    <MenuItem value="lunch">Lunch</MenuItem>
                  </Field>
                  {touched.type && errors.type ? (
                    <Typography color={"#d32f2f"} fontSize={12} pl={2}>
                      {errors.type}
                    </Typography>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ fontWeight: "bold" }}>Employee</InputLabel>
                <Field
                  as={Autocomplete}
                  label="Employees"
                  name="employeeIds"
                  limitTags={1}
                  options={[{ label: 'all', value: 'all' }, ...getEmployeesAsLabels]}
                  multiple
                    disableCloseOnSelect 
                  getOptionLabel={(option) => option.label}
                  onChange={(e, value) => {
                    if (value.some(option => option.value === 'all')) {
                      setFieldValue("employeeIds", getEmployeesAsLabels);
                    } else {
                      setFieldValue("employeeIds", value);
                    }
                  }}
                  isOptionEqualToValue={isOptionEqualToValue}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                        checkedIcon={<CheckBoxIcon fontSize="small"/>}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
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
              <Grid item xs={3}>
                <InputLabel sx={{ fontWeight: "bold" }}>Start</InputLabel>
                <Field
                  as={TextField}
                  label="Start"
                  name="start"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  type="datetime-local"
                  error={touched.start && !!errors.start}
                  helperText={touched.start && errors.start}                   
                />
              </Grid>
              <Grid item xs={3}>
                <InputLabel sx={{ fontWeight: "bold" }}>End</InputLabel>
                <Field
                  as={TextField}
                  label="End"
                  name="end"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  type="datetime-local"
                  error={touched.end && !!errors.end}
                  helperText={touched.end && errors.end}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ fontWeight: "bold" }}>Location</InputLabel>
                <Field
                  as={TextField}
                  label="Location"
                  name="location"
                  fullWidth
                  margin="normal"
                  error={touched.location && !!errors.location}
                  helperText={touched.location && errors.location}                   
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ fontWeight: "bold" }}>Location URL</InputLabel>
                <Field
                  as={TextField}
                  label="Location URL"
                  name="locationUrl"
                  fullWidth
                  margin="normal"
                  error={touched.locationUrl && !!errors.locationUrl}
                  helperText={touched.locationUrl && errors.locationUrl}                   
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
                    onClick={closeForm}
                  >
                    Close
                  </Button>
                  <Button 
                  variant="contained" 
                  color="primary" 
                  type="submit"
                  >
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

EventForm.propTypes = {
  onClose: PropTypes.func,
  eventToEdit: PropTypes.object,
  time: PropTypes.shape({
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired
  }).isRequired,
  closeForm:PropTypes.func
};

export default EventForm;
