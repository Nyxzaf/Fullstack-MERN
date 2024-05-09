import { Box } from "@mui/material";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import "../../css/calendar.css";

export default function Calendar() {
  const localizer = dayjsLocalizer(dayjs);
  const events = [
    {
      start: dayjs(`2024-05-07T12:00:00`).toDate(),
      end: dayjs(`2024-05-07T13:00:00`).toDate(),
      title: "Task 1",
    },
    {
      start: dayjs(`2024-05-07T13:00:00`).toDate(),
      end: dayjs(`2024-05-07T14:00:00`).toDate(),
      title: "Task 1",
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
