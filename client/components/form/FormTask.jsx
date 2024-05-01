import { useState } from "react";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Typography, Container } from '@mui/material';
import { Formik, Form, Field, useField } from "formik";
import { FONT_FAMILY } from '../../assets/Fonts/FontFamily';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ label, ...props }) => {
  const [ meta, helpers] = useField(props);
  const { value } = meta;
  const { setValue } = helpers;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      {meta.touched && meta.error ? (
        <Typography style={{ color: 'red' }}>{meta.error}</Typography>
      ) : null}
    </>
  );
};


const validationSchema = Yup.object({
  title: Yup.string().required('El título es requerido'),
  workHours: Yup.number().required('Las horas de trabajo son requeridas').min(0, 'Las horas de trabajo deben ser un número positivo'),
  severity: Yup.string().required('La severidad es requerida'),
  /*description: Yup.string().required('La descripción es requerida'),*/
});

function TaskForm({ onSave }) {
  const [isSubmitted, setIsSubmitted] = useState(false); 

  if (isSubmitted) {
    return <Typography>¡Formulario enviado con éxito!</Typography>; 
  }

  return (
    <Container maxWidth="md">
      <Formik
        initialValues={{
          title: '',
          workHours: '',
          severity: '',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSave(values);
          setIsSubmitted(true); 
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field as={TextField} label="Título" name="title" fullWidth margin="normal" error={touched.title && !!errors.title} helperText={touched.title && errors.title} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Field as={TextField} label="Horas de Trabajo" name="workHours" type="number" fullWidth margin="normal" error={touched.workHours && !!errors.workHours} helperText={touched.workHours && errors.workHours} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth margin="normal" error={touched.severity && !!errors.severity} sx={{fontFamily:FONT_FAMILY }}>
                  <InputLabel>Severidad</InputLabel>
                  <Field as={Select} name="severity" label="Severidad" >
                    <MenuItem value="low">Baja</MenuItem>
                    <MenuItem value="medium">Media</MenuItem>
                    <MenuItem value="high">Alta</MenuItem>
                    <MenuItem value="critical">Crítica</MenuItem>
                  </Field>
                  {touched.severity && errors.severity ? <Typography style={{ color: 'red' }}>{errors.severity}</Typography> : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <QuillEditor label="Descripción" name="description" />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Guardar y enviar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default TaskForm;