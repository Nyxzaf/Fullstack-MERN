import { useState } from "react";
import { Grid, Button, TextField, InputLabel } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

const validationSchema = Yup.object({
  DNI: Yup.string()
    .matches(/^[0-9]+$/, "DNI must contain only digits")
    .min(8, "DNI must be exactly 8 digits")
    .max(8, "DNI must be exactly 8 digits")
    .required("DNI is required"),
  Name: Yup.string().required("Name is required"),
  LastName: Yup.string().required("Last Name is required"),
  DateOfBirth: Yup.date().required("Date of Birth is required"),
  Phone: Yup.string()
    .matches(/^9[0-9]{8}$/, "Phone number must start with 9 and have exactly 9 digits")
    .required("Phone is required"),
  Email: Yup.string().email("Invalid email address").required("Email is required"),
  Salary: Yup.number().positive("Salary must be a positive number").required("Salary is required"),
  Position: Yup.string().required("Position is required"),
});

function DataForm({ onSave, onClose }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSave(values);
      setSubmitting(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving form:", error);
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose(true);
  };

  return (
    <>
      {isOpen && (
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={8}>
            <Formik
              initialValues={{
                DNI: "",
                Name: "",
                LastName: "",
                DateOfBirth: new Date(),
                Phone: "",
                Email: "",
                Salary: "",
                Position: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ fontWeight: "bold" }}>DNI</InputLabel>
                      <Field
                        as={TextField}
                        label="DNI"
                        name="DNI"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.DNI && !!errors.DNI}
                        helperText={touched.DNI && errors.DNI}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ fontWeight: "bold" }}>Name</InputLabel>
                      <Field
                        as={TextField}
                        label="Name"
                        name="Name"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.Name && !!errors.Name}
                        helperText={touched.Name && errors.Name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ fontWeight: "bold" }}>Last Name</InputLabel>
                      <Field
                        as={TextField}
                        label="Last Name"
                        name="LastName"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.LastName && !!errors.LastName}
                        helperText={touched.LastName && errors.LastName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ fontWeight: "bold" }}>Date of Birth</InputLabel>
                      <Field
                        as={TextField}
                        label="Date of Birth"
                        name="DateOfBirth"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.DateOfBirth && !!errors.DateOfBirth}
                        helperText={touched.DateOfBirth && errors.DateOfBirth}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ fontWeight: "bold" }}>Salary</InputLabel>
                      <Field
                        as={TextField}
                        label="Salary"
                        name="Salary"
                        type="number"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.Salary && !!errors.Salary}
                        helperText={touched.Salary && errors.Salary}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <InputLabel sx={{ fontWeight: "bold" }}>Phone</InputLabel>
                      <Field
                        as={TextField}
                        label="Phone"
                        name="Phone"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.Phone && !!errors.Phone}
                        helperText={touched.Phone && errors.Phone}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ fontWeight: "bold" }}>Email</InputLabel>
                      <Field
                        as={TextField}
                        label="Email"
                        name="Email"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.Email && !!errors.Email}
                        helperText={touched.Email && errors.Email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel sx={{ fontWeight: "bold" }}>Position</InputLabel>
                      <Field
                        as={TextField}
                        label="Position"
                        name="Position"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        error={touched.Position && !!errors.Position}
                        helperText={touched.Position && errors.Position}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit">
                        Save and Submit
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleClose}>
                        Close
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      )}
    </>
  );
}

DataForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DataForm;
