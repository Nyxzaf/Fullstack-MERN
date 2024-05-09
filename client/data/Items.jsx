import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import DatasetIcon from "@mui/icons-material/Dataset";
import TableViewIcon from "@mui/icons-material/TableView";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export const ITEM = [
  {
    Title: "Home",
    SubTitle: "Home",
    content: "Here the employee's information is added",
    Icon: <HomeIcon />,
    Path: "/",
  },
  {
    Title: "Data",
    SubTitle: "Employee Data",
    content: "Add the employee's information here",
    Icon: <DatasetIcon />,
    Path: "/data",
  },
  {
    Title: "Tasks",
    SubTitle: "Table Task",
    content: "Add the tasks to the employee here.",
    Icon: <PlaylistAddCheckIcon />,
    Path: "/task",
  },
  {
    Title: "Tables",
    SubTitle: "General Table",
    content:
      "Here you'll find all the information about employees and their tasks.",
    Icon: <TableViewIcon />,
    Path: "/tables",
  },
  {
    Title: "Calendar",
    SubTitle: " Calendar",
    content: "Here you will find the employees' birthdays and tasks.",
    Icon: <CalendarMonthIcon />,
    Path: "/calendar",
  },
];

export const FORM_ITEM = [
  {
    id: 1,
    Title: "DNI",
    Name: "DNI",
    grid: 4,
  },
  {
    id: 2,
    Title: "Name",
    Name: "Name",
    grid: 4,
  },
  {
    id: 3,
    Title: "Last Name",
    Name: "LastName",
    grid: 4,
  },
  {
    id: 4,
    Title: "Phone",
    Name: "Phone",
    grid: 4,
  },
  {
    id: 5,
    Title: "Position",
    Name: "Position",
    grid: 5,
  },
];
