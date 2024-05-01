import { useState } from "react";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Typography, Container } from '@mui/material';
import { Formik, Form, Field } from "formik"; 
import { FONT_FAMILY } from '../../assets/Fonts/FontFamily';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string().required('El título es requerido'),
  workHours: Yup.number().required('Las horas de trabajo son requeridas').min(0, 'Las horas de trabajo deben ser un número positivo'),
  severity: Yup.string().required('La severidad es requerida'),
  description: Yup.string().required('La descripción es requerida'), 
});

function TaskForm({ onSave, onClose }) {
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
      <Container maxWidth="sm" style={{ border: '2px solid #339194', padding: '20px', borderRadius: '5px', fontFamily: FONT_FAMILY, backgroundColor: '#eafde6' }}>
        <Formik
          initialValues={{
            title: '',
            workHours: '',
            severity: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputLabel style={{ fontWeight: 'bold' }}>Título</InputLabel>
                  <Field as={TextField} label="Título" name="title" fullWidth margin="normal" InputProps={{ style: { backgroundColor: 'white' } }} error={touched.title && !!errors.title} helperText={touched.title && errors.title} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <InputLabel style={{ fontWeight: 'bold' }}>Horas de Trabajo</InputLabel>
                  <Field as={TextField} label="Horas de Trabajo" name="workHours" type="number" fullWidth margin="normal" InputProps={{ style: { backgroundColor: 'white' } }} error={touched.workHours && !!errors.workHours} helperText={touched.workHours && errors.workHours} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <InputLabel style={{ fontWeight: 'bold' }}>Severidad</InputLabel>
                  <FormControl fullWidth margin="normal" error={touched.severity && !!errors.severity}>
                    <InputLabel>Severidad</InputLabel>
                    <Field as={Select} name="severity" label="Severidad" style={{ backgroundColor: 'white' }}>
                      <MenuItem value="low">Baja</MenuItem>
                      <MenuItem value="medium">Media</MenuItem>
                      <MenuItem value="high">Alta</MenuItem>
                      <MenuItem value="critical">Crítica</MenuItem>
                    </Field>
                    {touched.severity && errors.severity ? <Typography style={{ color: 'red' }}>{errors.severity}</Typography> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel style={{ fontWeight: 'bold' }}>Descripción</InputLabel>
                  <Field as={TextField} label="Descripción" name="description" fullWidth multiline rows={4} margin="normal" InputProps={{ style: { backgroundColor: 'white' } }} error={touched.description && !!errors.description} helperText={touched.description && errors.description} />
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" type="submit">
                    Guardar y enviar
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button color="primary" onClick={handleClose} style={{ backgroundColor: '#a2a9af' }}>
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

export default TaskForm;
