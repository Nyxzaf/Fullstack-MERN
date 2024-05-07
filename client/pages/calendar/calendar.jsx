import { Box } from "@mui/material";
import { Calendar , dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs  from 'dayjs'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import '../../css/calendar.css'

export default function calendar() {

    const localizer = dayjsLocalizer(dayjs)
    const events = [
        {
            start: dayjs(`2024-05-07T12:00:00`).toDate(),
            end: dayjs(`2024-05-07T13:00:00`).toDate(),
            title:"Task 1",
        },
        {
            start: dayjs(`2024-05-07T13:00:00`).toDate(),
            end: dayjs(`2024-05-07T14:00:00`).toDate(),
            title:"Task 1",
        }
    ]
    const components = {
        event: Props => {
            return (
                <Box display={"flex"}>
                    <PlaylistAddCheckIcon/>
                    {Props.title}
                </Box>
            )   
        }
    }


    return (
    <Box width={{xl:'86.9vw',lg:"86.9vw",xs:"99vw"}} height={"100vh"} ml={{xl:25,lg:25, md:0, xs:0}} py={0.5}>
        <Calendar
        localizer={localizer}
        events={events}
        views={["month","day"]}
        components={components}     
        />
    </Box>
    );
}
