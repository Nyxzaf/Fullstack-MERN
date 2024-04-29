import {  Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { ITEM_2 } from "../../data/Items";
import { COLOR } from '../../assets/Color/colors'
import { FONT_FAMILY } from '../../assets/Fonts/FontFamily'

const Home = () => {
    return (
        <Grid item xl={10}>
            <Grid container spacing={3} ml={10}>
                <Grid item xl={12} my={5}>
                    <Typography variant="h2" fontFamily={FONT_FAMILY}>Home</Typography>
                </Grid>
                {
                    ITEM_2.map((item)=>{
                        return(
                            <Grid item xl={5} xs={12} key={item.Title}>  
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
                {/* <Grid item xl={5} xs={12} >
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                            asdasdas
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
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
                <Grid item xl={5} xs={12}>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Word of the Day
                            </Typography>
                            <Typography variant="h5" component="div">
                            asdasdas
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
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
                </Grid> */}
            </Grid>
        </Grid>
    );
}

export default Home;
