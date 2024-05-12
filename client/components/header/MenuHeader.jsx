import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { IMG_1 } from "../../assets/img/images.js";
import { ITEM } from "../../data/Items";
import { Link } from "react-router-dom";



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
                        ITEM.map((list)=>{
                            return(
                                <ListItem key={list.Title} disablePadding sx={{my:1}}>
                                    <ListItemButton sx={{flexDirection:"column"}} component={Link} to={list.Path}>
                                        <ListItemIcon sx={{justifyContent:"center"}} >
                                            {list.Icon}
                                        </ListItemIcon>
                                            {list.Title}
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
