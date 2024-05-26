import { Box,Card, IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types'; 
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FONT_FAMILY } from '../../assets/fonts/FontFamily';

const CardTask = ({ title , description }) => {
    return (
    <Card sx={{ borderRadius: "15px", p: 1.5, border: '3px solid lightgreen' }}>
        <Box display={'flex'} justifyContent="space-between" alignItems={"center"}>
        <Typography fontSize={14} color={'gray'} fontFamily={FONT_FAMILY} >
            juan Gabriel
        </Typography>
        <Box>
            <IconButton>
            <EditIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton  >
            <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
        </Box>
        </Box>
        <Typography variant="body1" fontSize={20} component="div" color={"lightgreen"} fontWeight={"bold"} fontFamily={FONT_FAMILY}>
        {title} 
        </Typography>
        <Typography fontSize={15} variant="body1"  component="div" fontFamily={FONT_FAMILY}>
        {description} 
        </Typography>
        <Typography fontSize={15} fontFamily={FONT_FAMILY}>
        28/03/2001
        </Typography>
    </Card>
    );
  };

CardTask.propTypes = {
    title: PropTypes.string,
    description:PropTypes.string
}


export default CardTask;
