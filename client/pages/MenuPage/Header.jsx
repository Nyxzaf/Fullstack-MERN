import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import { FONT_FAMILY } from '../../assets/Fonts/FontFamily';
import { COLOR } from '../../assets/Color/colors';
import MenuHeader from '../../components/header/MenuHeader';
import { IMG_1 } from '../../assets/img/images';
import { ITEM } from '../../data/Items';


const Header = () => {
    return (
        <AppBar sx={{ background: "white", display:{xs:"block",xl:"none"}}} position={"sticky"}  >
                <Toolbar>
                    <Box flexGrow={1}>
                        <a href='/'>
                        <img src={IMG_1} height={80} width={90} alt="Logo" />
                        </a>
                    </Box>
                    <Stack direction={"row"} spacing={3} alignItems={"center"} display={{ xs:'none',sm:"block"}}>
                        {
                            ITEM.map((icon)=>{
                                return(
                                    <Typography 
                                    key={icon.Title}
                                    component={"a"}
                                    href='/' 
                                    color={COLOR} 
                                    fontFamily={FONT_FAMILY} 
                                    fontSize={20} 
                                    sx={{textShadow: '2px 2px 4px rgba(1,1,10,0.10)', textDecoration:"none"}}>
                                        {icon.Title}    
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
