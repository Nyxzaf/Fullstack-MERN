import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import { FONT_FAMILY } from '../../assets/Fonts/FontFamily';
import { COLOR } from '../../assets/Color/colors';
import MenuHeader from '../../components/header/MenuHeader';
import Home from '@mui/icons-material/Home';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import LoginIcon from '@mui/icons-material/Login';
import Person2Icon from '@mui/icons-material/Person2';
import { IMG_1 } from '../../assets/img/images';




export const ICONS = [
    {
        title:"Home" , icon: <Home/>
    },
    {
        title:"Dowload",icon:<DownloadForOfflineIcon/>
    },
    {
        title:"Register",icon:<LoginIcon/>
    },
    {
        title:"Credits",icon:<Person2Icon/>
    }
]


const Header = () => {
    return (
        <AppBar sx={{ background: "white"}} position={"static"} >
                <Toolbar>
                    <Box flexGrow={1}>
                        <a href='/'>
                        <img src={IMG_1} height={80} width={90} alt="Logo" />
                        </a>
                    </Box>
                    <Stack direction={"row"} spacing={3} alignItems={"center"} display={{ xs:'none',sm:"block"}}>
                        {
                            ICONS.map((icon)=>{
                                return(
                                    <Typography 
                                    key={icon.title}
                                    component={"a"}
                                    href='/' 
                                    color={COLOR} 
                                    fontFamily={FONT_FAMILY} 
                                    fontSize={20} 
                                    sx={{textShadow: '2px 2px 4px rgba(1,1,10,0.10)', textDecoration:"none"}}>
                                        {icon.title}    
                                    </Typography>
                                )
                            })
                        }
                    </Stack>
                        <MenuHeader/>                        
                </Toolbar>
        </AppBar>
    );
}

export default Header;
