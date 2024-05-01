import { Button,FormControl,Grid, InputAdornment, InputLabel, OutlinedInput, Paper , Stack, TextField, Typography } from '@mui/material'
import { FONT_FAMILY } from '../../assets/Fonts/FontFamily';
import { COLOR } from '../../assets/Color/colors';
import { useFormik } from 'formik'
// import { createEmployeeRequest } from '../../api/Employee';


const currentDate = new Date().toISOString().split('T')[0]; 



const FormPage = () => {

    const formik = useFormik({
        initialValues:{
            DNI:"",
            Name:"",
            LastName:"",
            DateOfBirth:"",
            Email:"",
            PhoneNumber:"",
            Salary:""
        }
    }
)


    return (
        <Grid item
        xs={12}
        xl={12}
        alignContent={"center"}
        alignItems={"center"}
        mx={25}
    >
        <Paper elevation={3} sx={{borderRadius:"30px", p:3}} >
            <Grid container flexDirection={"column"}>
                <Grid item xl={12} >
                <Typography variant='h4'sx={{my:2, textShadow: '2px 2px 4px rgba(1,1,1,0.3)'}} fontFamily={FONT_FAMILY} color={COLOR} textAlign={"center"} >
                    Operator Data
                </Typography>
                </Grid>
                <Grid item xl={12}>
                <Typography variant="body2" textAlign={"initial"} fontFamily={FONT_FAMILY} my={1}>
                    Rellene los espacios vacios con la información solicitada para enviar
                    al cuadro de datos del operador.
                </Typography>
                </Grid>
                <Grid item xl={12}>
                        <form >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={6}>
                                    <TextField fullWidth sx={{ my:1 }} name="Name" label="Name" type='text' />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth sx={{ my:1 }} name="LastName" label="Last Name"  type='text'/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth sx={{ my:1 }} name="DNI" label="DNI" type='text' placeholder='ejem: 12345678'/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth sx={{ my:1 }} name="DateOfBirth" label="Date of Birth" type='Date' defaultValue={currentDate}  />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth sx={{ my:1 }} name="PhoneNumber" label="Phone Number +51"  type='tel' placeholder='ejem: +51 912345678'/>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth sx={{ my: 1 }}>
                                        <InputLabel htmlFor="Amount">Salary</InputLabel>
                                        <OutlinedInput
                                            name='Salary'
                                            id="Amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Amount"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth sx={{ my:1 }} name="Email" label="Email"  type='email'/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack>
                                        <Button variant='contained' type='submit'>Guardar</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
    );
}

export default FormPage;
