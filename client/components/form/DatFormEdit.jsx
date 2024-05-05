    import { useState } from "react";
    import {
    Grid,
    Button,
    TextField,
    InputLabel,
    FormControlLabel,
    } from "@mui/material";
    import { Formik, Form, Field } from "formik";
    import * as Yup from "yup";
    import PropTypes from "prop-types";
    import { FORM_ITEM } from "../../data/Items";
    import Switch from "@mui/material/Switch";
    import { UseEmployee } from "../../context/EmployeeContext";

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
        .matches(
        /^9[0-9]{8}$/,
        "Phone number must start with 9 and have exactly 9 digits"
        )
        .required("Phone is required"),
    Email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    Salary: Yup.number()
        .positive("Salary must be a positive number")
        .required("Salary is required"),
    Position: Yup.string().required("Position is required"),
    });

    function DataFormEdit({ onSave, onClose, employee }) {
    const { createEmployee , updateEmployee  } = UseEmployee();
    const [isOpen, setIsOpen] = useState(true);

    const handleSubmit = async (values, actions) => {
        try {
        await onSave(values);
        actions.setSubmitting(false);
        if (employee) {
            await updateEmployee( employee._id,values)
        } else {
            await createEmployee(values)
        }
        setIsOpen(false);
        } catch (error) {
        console.error("Error saving form:", error);
        actions.setSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose(true);
    };

    return (    
        <>
        {isOpen && (
            <Grid container spacing={2} justifyContent="center" p={4}>
            <Grid item xs={12}>
                <Formik
                enableReinitialize
                initialValues={
                    employee || {
                    DNI: "",
                    Name: "",
                    LastName: "",
                    DateOfBirth: "",
                    Phone: "",
                    Email: "",
                    Salary: "",
                    Position: "",
                    Active: false,
                    }
                }
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                {({ errors, touched, setFieldValue }) => (
                    <Form>
                    <Grid container spacing={2}>
                        {FORM_ITEM.map((item) => {
                        return (
                            <Grid item xs={12} xl={item.grid} key={item.Title}>
                            <InputLabel sx={{ fontWeight: "bold" }}>
                                {item.Title}
                            </InputLabel>
                            <Field
                                as={TextField}
                                label={item.Title}
                                name={item.Name}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                type={item.Type}
                                margin="normal"
                                InputProps={{ style: { backgroundColor: "white" } }}
                                error={touched[item.Name] && !!errors[item.Name]}
                                helperText={touched[item.Name] && errors[item.Name]}
                            />
                            </Grid>
                        );
                        })}
                        <Grid item xs={12}>
                        <FormControlLabel
                            control={<Switch name="Active" color="primary" />}
                            label="active"
                            labelPlacement="end"
                            onChange={(event) =>
                            setFieldValue("Active", event.target.checked)
                            }
                        />
                        </Grid>
                        <Grid item xs={12} xl={10}>
                        <Button variant="contained" color="primary" type="submit" >
                            Save and Submit
                        </Button>
                        </Grid>
                        <Grid item xl={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                        >
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

    DataFormEdit.propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    employee: PropTypes.object,
    };

export default DataFormEdit;
