import { useState } from "react";
import {
    TextField,
    Button,
    InputLabel,
    Grid,
    Container,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { FORM_ITEM } from "../../data/Items";


const validationSchema = Yup.object({
    DNI: Yup.string()
    .matches(/^[0-9]+$/, "DNI must contain only digits")
    .min(8, "DNI must be exactly 8 digits")
    .max(8, "DNI must be exactly 8 digits")
    .required("DNI is required"),
    Name: Yup.string().required("Name is required"),
    LastName: Yup.string().required("LastName is required"),
    DateOfBirth: Yup.date().required('Date is required'),
    Phone: Yup.string()
        .matches(/^9[0-9]{8}$/, "Phone number must start with 9 and have exactly 9 digits")
        .required("Number Phone is required"),
    Email: Yup.string().email('email address needs "@"').required("Email is required"),
    Salary: Yup.number().required("Salary is required").min(1, "Salary must be a positive number"),
    Position: Yup.string().required("Position is required"),
    Description: Yup.string().required("Description is required"),
}); 

function DataForm({ onSave, onClose }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleSubmit = async (values, { setSubmitting }) => {
        await onSave(values);
        setSubmitting(false);
        setIsOpen(false);
    };

    const handleClose = () => {
        setIsOpen(false);
        onClose(true);
    };

    return (
        <>
        {isOpen && (
            <Container
            maxWidth="sm"
            sx={{
            // border: "2px solid #339194",
            padding: "20px",
            borderRadius: "5px",
            fontFamily: FONT_FAMILY,
            backgroundColor: "#eafde6",
            }}
        >
        <Formik
            initialValues={{
                DNI: "",
                Name:"",
                LastName:"",
                Email:"",
                DateOfBirth: "",
                Phone:"",
                Salary: "",
                Position: "",
                Description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <Grid container spacing={2}>
                    {
                        FORM_ITEM.map((item)=>{
                            return(
                                <Grid item xs={12} xl={item.grid} key={item.Title}>
                                    <InputLabel sx={{ fontWeight: "bold"}}>{item.Title}</InputLabel>
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
                            )
                        })
                    }
                        <Grid item xs={10}>
                            <Button variant="contained" color="primary" type="submit">
                            Save and Submit
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
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
            </Container>
        )}
        </>
    );
}

DataForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DataForm;
