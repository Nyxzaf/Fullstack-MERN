import { Card, Typography } from '@mui/material';
import PropTypes from 'prop-types'; 

const CardTask = ( { user  }) => {

    return (
            <Card 
            sx={{borderRadius:"15px", p:1,border: '3px solid orange'}} >
                    <Typography fontSize={12} color={"grey"} >
                        {user.name}
                    </Typography>
                    <Typography variant="body1" component="div" color={"orange"} fontWeight={"bold"}>
                        Realizar trabajos
                    </Typography>
                    <Typography  fontSize={14}>
                        9pm- 12pm (hours worked )
                    </Typography>
                    <Typography fontSize={15}>
                        28/03/2001
                    </Typography>
            </Card>
    );
};

CardTask.propTypes = {
    user: PropTypes.object
}


export default CardTask;
