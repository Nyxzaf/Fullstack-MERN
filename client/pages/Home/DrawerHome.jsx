import { Box ,Divider, Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { IMG_1 } from "../../assets/img/images";
import { ITEM } from "../../data/Items";

// display={{xl:"block",xs:"none"}}   



const DrawerHome = () => {
    return (
          <Box
          display={{xl:"block",xs:"none"}}  
          >  
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    '& .MuiPaper-root': { 
                        bgcolor: '', 
                        width: '200px'
                    }
                }}
                >
                <Toolbar>
                    <a href="/">
                    <img src={IMG_1} width={"100%"} />
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
                                        <ListItemButton style={{ color: "#154360" }} href={item.Path}> 
                                            {item.Icon}
                                            <ListItemText  sx={{alignText:"center", pl:2 }}>{item.SubTitle}</ListItemText>
                                        </ListItemButton>
                                </List>
                            </Box>
                        )
                    })
                }
            </Drawer>
          </Box>   
    );
}

export default DrawerHome;