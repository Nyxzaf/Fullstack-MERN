import { Button,Grid, Paper , TextField, Typography } from '@mui/material'
import { MERRIWEATHER } from '../../assets/Fonts/FontFamily';
import { COLOR } from '../../assets/Color/colors';
import { Form  , Formik } from 'formik'
import { createPostRequest } from '../../api/Posts';


const currentDate = new Date().toISOString().split('T')[0]; 



const FormPage = () => {

    const  createPost = async(post)=>{
        const res = await createPostRequest(post)
        console.log(res);
    }

    return (
        <Grid item
        xs={12}
        lg={4}
    >
        <Paper elevation={3} sx={{borderRadius:"30px", p:3}} >
                <Typography variant='h4'sx={{my:2, textShadow: '2px 2px 4px rgba(1,1,1,0.3)'}} fontFamily={MERRIWEATHER} color={COLOR} textAlign={"center"} > Base de Datos</Typography>
                <Typography variant="body2" textAlign={"initial"} fontFamily={MERRIWEATHER}>
                    Rellene los espacios vacios con la información solicitada para enviar , posteriormente ,
                    al cuadro de datos.
                </Typography>
                <Formik
                initialValues={
                    {
                        DNI:"asdasd",
                        Name:"asdasd",
                        LastName:"asdasd",
                        DateOfBirth:"asdasd"
                    }
                }
                onSubmit={(values,actions)=>{
                    createPost(values)
                }}     
                >
                {
                    ({handleSubmit})=> (
                    <Form onSubmit={handleSubmit}>
                        <TextField fullWidth sx={{my:1}} name="DNI" label="DNI" type='text' placeholder='ejem: 12345678'/>
                        <TextField fullWidth sx={{my:1}} name="Name" label="Name" type='text' />
                        <TextField fullWidth sx={{my:1}} name="LastName" label="Last Name"  type='text'/>
                        <TextField fullWidth sx={{my:2}} name="DateOfBirth" label="Date of Birth" type='Date' defaultValue={currentDate}  />
                        <Grid container justifyContent="flex-end">
                            <Button variant='contained' type='submit'>Guardar</Button>
                        </Grid>
                    </Form>
                    )
                }
                </Formik>
        </Paper>
    </Grid>
    );
}

export default FormPage;
