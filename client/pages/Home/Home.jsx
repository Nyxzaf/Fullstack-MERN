import { Card, CardActionArea, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { ITEM } from "../../data/Items";
import { COLOR } from '../../assets/color/colors'
import { FONT_FAMILY } from '../../assets/fonts/FontFamily'





const Home = () => {
    return (
            <Grid container spacing={3} ml={32} width={'calc(100% - 440px)'} >
                <Grid item xl={12} xs={12} my={5}>
                    <Typography variant="h2" fontFamily={FONT_FAMILY}>Home</Typography>
                </Grid> 
                {
                    ITEM.slice(1).map((item)=>{
                        return(
                            <Grid item xl={6} xs={12} sm={6} key={item.Title}>  
                                <Card>
                                    <CardActionArea href={item.Path}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} fontFamily={FONT_FAMILY} color={COLOR} display={"flex"} gutterBottom>                                     
                                        {item.Icon}
                                        {item.Title}
                                        </Typography>
                                        <Typography variant="h5" fontWeight={"bold"} component="div"  color={COLOR} >
                                        {item.SubTitle}
                                        </Typography>
                                        <Typography variant="body2" pb={2}>
                                        {item.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Typography pl={1} fontWeight={"bold"} >{item.SubTitle}  {">"}</Typography>
                                    </CardActions>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
    );
}

export default Home;