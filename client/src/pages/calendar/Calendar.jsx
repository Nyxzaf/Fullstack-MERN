import { Backdrop, Box, CircularProgress, Dialog } from "@mui/material";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "../../css/calendar.css";
import { useEffect, useState } from "react";
import EventForm from "../../components/form/EventForm";
import { UseEmployee } from "../../context/EmployeeContext";
import EventModal from "../../components/modal/EventModal";


export default function Calendar() {
  const localizer = dayjsLocalizer(dayjs);
  const [eventsState, setEventsState] = useState({ data: [], isLoading: true });
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState({});
  const { event  } = UseEmployee();
    
    useEffect(() => {
      const Events = event.map((ev) => ({
        ...ev,
        start: dayjs(ev.start).toDate(),
        end: dayjs(ev.end).toDate(),
      }));
  
      setEventsState({
        data: Events,
        isLoading: false,
      });
    }, [event]);
    
  
    const handleSelectSlot = ({ start, end }) => {
      setSelectedSlot({ start, end });
      setShowForm(true);
    };

    const handleSelectEvent = (event)=>{
      console.log("event",event);
      setSelectedEvent(event)
      setShowModal(true);

    }


    const components = {
      event: ({ event }) => (
        <Box display={"flex"} justifyContent="center">
          {event.title}
        </Box>
      ),
      day: {
        event: ({ event }) => (
          <Box display={"flex"} justifyContent={"left"} ml={2} mt={1}>
            {event.title}
          </Box>
        ),
      },
      week: {
        event: () => (
          <Box display={"flex"} justifyContent={"center"} ml={2}>
            {""}
          </Box>
        ),
      },
    };

    return (
      <>
      <Box p={3} height={"100vh"}>
        <BigCalendar
          localizer={localizer}
          events={eventsState.data}
          views={["month", "week", "day"]}
          components={components}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
        />
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={eventsState.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        maxWidth="md"
      >
        <EventForm
          onClose={() => setShowForm(false)}
          time={selectedSlot || { start: new Date(), end: new Date() }}
        />
      </Dialog>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="sm"
      >
        <EventModal 
        onClose={() => setShowModal(false)} 
        event={selectedEvent}
        />
      </Dialog>
    </>
    );
  }



