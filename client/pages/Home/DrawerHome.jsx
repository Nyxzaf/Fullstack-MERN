import { Box, Divider, Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { IMG_1 } from "../../assets/img/images";
import { Home } from '@mui/icons-material'
import { COLOR } from "../../assets/Color/colors";
const DrawerHome = () => {
    return (
        <Box display={"flex"}>
            <Drawer
                variant="permanent"
                anchor="left"
                >
                <Toolbar>
                    <a href="/">
                    <img src={IMG_1} width={190} height={130}/>
                    </a>
                </Toolbar>
                <Divider/>
                <List>
                    <Typography pl={3} py={0.5} color={COLOR}>
                    Menú    
                    </Typography>
                        <ListItemButton>
                            <Home/>
                            <ListItemText  sx={{alignText:"center", pl:4}}>Home</ListItemText>
                        </ListItemButton>
                </List>
            </Drawer>
        </Box>
    );
}

export default DrawerHome;
