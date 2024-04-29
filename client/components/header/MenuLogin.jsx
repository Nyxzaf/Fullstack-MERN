import { PersonAdd , Settings , Logout} from '@mui/icons-material';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem , Tooltip, IconButton, Box } from '@mui/material'
import { useState } from 'react';
import { IMG_2 } from '../../assets/img/images';

const MenuLogin= () => {
    const [anchorEl, setAnchorEl] = useState();
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
        setAnchorEl(null);
        };
    return (
        <Box m  l={1} >
            <Tooltip title="Cuenta">
                <IconButton
                    onClick={handleClick}
                    size="medium"
                >
                    <Avatar sx={{ width: 35, height: 35 }} src={IMG_2} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                <Avatar src={IMG_2} /> Perfil
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <Avatar src={IMG_2}/> Mi Cuenta
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <PersonAdd fontSize="small"/>
                </ListItemIcon>
                    Agregar otra cuenta
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                    Configuración
                </MenuItem>
                <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                    Cerrar Sesion
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default MenuLogin;
