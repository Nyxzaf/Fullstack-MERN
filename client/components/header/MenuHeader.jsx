import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { ICONS } from "../../pages/MenuPage/Header";
import { useState } from "react";
import { IMG_1 } from "../../assets/img/images";



const MenuHeader = () => {

    const [Open, setOpen] = useState(false);


    return (
        <Box>   
            <IconButton
            aria-label="open drawer"
            onClick={()=>setOpen(true)}
            edge="start"
            sx={{display: { xs: "block", sm: "none" }}} 
            >
                <MenuIcon/>
            </IconButton>
            <Drawer 
            open={Open} 
            onClose={()=>setOpen(false)}
            >
                <a href="/">
                <img src={IMG_1} height={80} width={90} style={{alignItems:"center",paddingLeft:15}} />
                </a>
                <List>
                    {
                        ICONS.map((list)=>{
                            return(
                                <ListItem key={list.title} disablePadding sx={{my:1, fontFamily:"MERRIWEATHER"}}>
                                    <ListItemButton sx={{flexDirection:"column"}}>
                                        <ListItemIcon sx={{justifyContent:"center"}} >
                                            {list.icon}
                                        </ListItemIcon>
                                            {list.title}
                                    </ListItemButton>
                                </ListItem>
                                
                            )
                        })
                    }
                </List>
            </Drawer>
        </Box>
    );
}

export default MenuHeader;
