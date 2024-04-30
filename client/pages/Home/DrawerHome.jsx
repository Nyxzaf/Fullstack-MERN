import { Box ,Divider, Drawer, Grid, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { IMG_1 } from "../../assets/img/images";
import { ITEM } from "../../data/Items";




const DrawerHome = () => {
    return (
        <Grid item xl={1} display={{xl:"block",xs:"none"}}>
            <Drawer
                variant="permanent"
                anchor="left"
                >
                <Toolbar>
                    <a href="/">
                    <img src={IMG_1} width={190} height={160}/>
                    </a>
                </Toolbar>
                <Divider/>
                {
                    ITEM.map((item)=>{
                        return(
                            <Box key={item.Title}>
                                <Divider/>
                                <List>
                                    <Typography pl={2}  color="#154360" fontWeight={"bold"} >
                                    {item.Title}    
                                    </Typography>
                                        <ListItemButton style={{ color: "#154360" }}> 
                                            {item.Icon}
                                            <ListItemText  sx={{alignText:"center", pl:2 }}>{item.SubTitle}</ListItemText>
                                        </ListItemButton>
                                </List>
                            </Box>
                        )
                    })
                }
            </Drawer>
        </Grid>
    );
}

export default DrawerHome;
