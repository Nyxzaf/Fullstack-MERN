import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const CardTask = ( { user }) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    }= useSortable({
        id: user.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        >
            <Card 
            sx={{borderRadius:"15px"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                        Realizar trabajos
                    </Typography>
                    <Typography>
                        9pm- 12pm (hours worked )
                    </Typography>
                    <Typography pt={1}>
                        28/03/2001
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

CardTask.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired, 
        id: PropTypes.number.isRequired
    }).isRequired
};


export default CardTask;
