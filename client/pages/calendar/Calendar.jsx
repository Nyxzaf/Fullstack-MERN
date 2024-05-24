import { Box } from "@mui/material";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import "../../css/calendar.css";

export default function   Calendar() {

  const localizer = dayjsLocalizer(dayjs);

  const events = [
    // {
    //   saludar:(id)=> {
    //     console.log(id);
    //   }
    // },
      {
        start: dayjs(`2024-05-07T12:00:00`).toDate(),
        end: dayjs(`2024-05-07T13:00:00`).toDate(),
        title: "Task 1",
      },
      {
        start: dayjs(`2024-05-07T13:00:00`).toDate(),
        end: dayjs(`2024-05-07T14:00:00`).toDate(),
        title: "Task 2  ",
      },
  ];
  const components = {
    event: (Props) => {
      return (
        <Box display={"flex"}>
          <PlaylistAddCheckIcon />
          {Props.title}
        </Box>
      );
    },
  };

  return (
    <Box
    p={3}
    height={"100vh"}
    >
      <BigCalendar
        localizer={localizer}
        events={events}
        views={["month", "day"]}
        components={components}
      />
    </Box>
  );
}

// import { useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import dayjs from "dayjs";
// import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
// import axios from "axios"; // Importa Axios para realizar solicitudes HTTP
// import "../../css/calendar.css";

// export default function Calendar() {
//   const localizer = dayjsLocalizer(dayjs);
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Función para obtener eventos desde el backend
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("/api/events"); // Reemplaza "/api/events" con la ruta correcta a tu endpoint de eventos
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEvents(); // Llama a la función de obtención de eventos al montar el componente
//   }, []);

//   const components = {
//     event: (Props) => {
//       return (
//         <Box display={"flex"}>
//           <PlaylistAddCheckIcon />
//           {Props.title}
//         </Box>
//       );
//     },
//   };

//   return (
//     <Box p={3} height={"100vh"}>
//       <BigCalendar
//         localizer={localizer}
//         events={events}
//         views={["month", "day"]}
//         components={components}
//       />
//     </Box>
//   );
// }