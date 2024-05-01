import {  Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { ITEM } from "../../data/Items";
import { COLOR } from '../../assets/color/colors'
import { FONT_FAMILY } from '../../assets/fonts/FontFamily'
const Home = () => {
    return (
        <Grid item xl={10} xs={8}>  
            <Grid container spacing={3} ml={10}>
                <Grid item xl={12} xs={10} my={5}>
                    <Typography variant="h2" fontFamily={FONT_FAMILY}>Home</Typography>
                </Grid>
                {
                    ITEM.slice(1).map((item)=>{
                        return(
                            <Grid item xl={5} xs={12} sm={6} key={item.Title}>  
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} fontFamily={FONT_FAMILY} color={COLOR} display={"flex"} gutterBottom>                                     
                                        {item.Icon}
                                        {item.Title}
                                        </Typography>
                                        <Typography variant="h5" fontWeight={"bold"} component="div"  color={COLOR} >
                                        {item.SubTitle}
                                        </Typography>
                                        <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Learn More</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Grid>
    );
}

export default Home;