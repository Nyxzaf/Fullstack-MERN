import { Box, Card, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "../../components/header/Title";
import { FORM_ITEM } from "../../data/Items";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import { B_COLOR, COLOR_2 } from "../../assets/color/colors";
import { UseEmployee } from "../../context/EmployeeContext";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { getTasksByEmployee } from "../../api/Tasks.js";

const InformationPage = () => {
  const { getEmployee } = UseEmployee();
  const params = useParams();
  const [employee, setEmployee] = useState({});
  const [taskEmployee, setTasksEmployee] = useState([]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  useEffect(() => {
    if (params.id) {
      getEmployee(params.id)
        .then((data) => {
          setEmployee(data);
          return getTasksByEmployee(data._id);  
        })
        .then((task) => {
          setTasksEmployee(task.data);
          console.log("Tareas del empleado:", task.data); 
        })
        .catch((error) => {
          console.error("Error getting employee or tasks:", error);
        });
    }
  }, [params.id]);

  const renderTasks = (status) => {
    const tasks = taskEmployee.filter((task) => task.state === status);
    const hasTasks = tasks.length > 0; 

    if (!hasTasks) {
      return (
        <Paper sx={{ mx: 2, bgcolor: B_COLOR, borderRadius: "10px" }}>
          <Typography fontWeight={"bold"} fontSize={18} textAlign={"center"} py={4}>
            There are no tasks
          </Typography>
        </Paper>
      );
    } else {
      return (
        <Paper sx={{ mx: 2, bgcolor: B_COLOR, borderRadius: "10px" }} >
          <Carousel responsive={responsive}>
            {tasks.map((task) => (
              <Card
                key={task._id}
                sx={{
                  mx: 1,
                  my: 1,
                  p: 1,
                  border: `3px solid ${
                    task.severity === "low"
                      ? "blue"
                      : task.severity === "medium"
                      ? "lightgreen"
                      : task.severity === "high"
                      ? "yellow"
                      : "red"
                  }`,
                  borderRadius: "10px",
                }}
              >
                <Typography
                  variant="body2"
                  component="div"
                  color={
                    task.severity === "low"
                      ? "blue"
                      : task.severity === "medium"
                      ? "lightgreen"
                      : task.severity === "high"
                      ? "yellow"
                      : "red"
                  }
                  fontWeight={"bold"}
                >
                  {task.title}
                </Typography>
                <Typography fontSize={14}>{task.description}</Typography>
                <Typography fontSize={13}>
                  {dayjs(task.createdAt).format("DD/MM/YYYY")}
                </Typography>
              </Card>
            ))}
          </Carousel>
        </Paper>
      );
    }
  };

  return (
    <>
      <Title title="Employee Information" />
      <Container>
        <Grid container spacing={2} mt={1}>
          <Grid sm={5} xs={12} item>
            <Paper
              component={"section"}
              sx={{ borderRadius: "22px" }}
              elevation={1}
            >
              <Typography
                p={2}
                mb={0}
                borderRadius="22px 22px 0px 0px"
                color={"white"}
                align="center"
                bgcolor={COLOR_2}
                fontFamily={FONT_FAMILY}
                variant="h4"
              >
                Personal information
              </Typography>
              <Box
                component={"ul"}
                p={2}
                my={0}
                display={"flex"}
                flexDirection={"column"}
                gap={"0.65rem"}
              >
                {FORM_ITEM.map((item) => (
                  <Box
                    component={"li"}
                    key={item.id}
                    sx={{ listStyleType: "none" }}
                  >
                    <Typography
                      fontFamily={FONT_FAMILY}
                      fontSize={".85rem"}
                      color={"primary"}
                      fontWeight={"medium"}
                    >
                      {item.Title}:
                    </Typography>
                    <Typography>
                      {item.Type === "Date"
                        ? dayjs.utc(employee[item.Name]).format("DD/MM/YYYY")
                        : employee[item.Name]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
          <Grid item sm={7} xs={12}>
            <Paper sx={{ borderRadius: "22px", minHeight: "533px" }}>
              <Typography
                p={2}
                borderRadius="22px 22px 0px 0px"
                color={"white"}
                align="center"
                bgcolor={COLOR_2}
                fontFamily={FONT_FAMILY}
                variant="h4"
              >
                Task
              </Typography>
              <Box p={1}>
                <Typography
                  px={2}
                  py={1.5}
                  color={COLOR_2}
                  fontFamily={FONT_FAMILY}
                >
                  Backlog:
                </Typography>
                    {renderTasks("Backlog")}
                <Typography
                  px={2}
                  py={1.5}
                  color={COLOR_2}
                  fontFamily={FONT_FAMILY}
                >
                  In Progress:
                </Typography>
                    {renderTasks("In Progress")}
                <Typography
                  px={2}
                  py={1.5}
                  color={COLOR_2}
                  fontFamily={FONT_FAMILY}
                >
                  Done:
                </Typography>
                    {renderTasks("Done")}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default InformationPage;
