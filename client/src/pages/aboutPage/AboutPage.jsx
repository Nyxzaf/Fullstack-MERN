import { Box, Container, Link, Paper, Typography } from "@mui/material";
import Title from "../../components/header/Title";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const AboutPage = () => {
  return (
    <>
      <Title title="About The Page" Icon={ContactMailIcon} />
      <Container>
        <Paper>
          <Box p={3} height={"615px"}>
            <Typography pb={2} align={"center"} variant="h3">
              PROJECT LLAMA
            </Typography>
            <Typography fontWeight={"bold"}>Developer:</Typography>
            <Typography pb={2} fontSize={14}>
              Angelo Cristian Choque Maravi
            </Typography>
            <Typography fontWeight={"bold"}>Description:</Typography>
            <Typography pb={2} fontSize={14}>
              This page is created with different libraries allowing for
              employee management, task administration, and event scheduling,
              thus addressing solutions to the personnel management issue. Its
              built with the MERN Stack, using libraries such as Dnd-Kit,
              Big-calendar, among others.
            </Typography>
            <Typography fontWeight={"bold"}>Description:</Typography>
                <Box component={"li"} fontWeight={"normal"} >Dnd-Kit</Box>
                <Box component={"li"} fontWeight={"normal"} >Big Calendar</Box>
                <Box component={"li"} fontWeight={"normal"} >Mongo DB</Box>
                <Box component={"li"} fontWeight={"normal"} >Express</Box>
                <Box component={"li"} fontWeight={"normal"} >React</Box>
                <Box component={"li"} fontWeight={"normal"} >Next</Box>
                <Box component={"li"} fontWeight={"normal"} >Vite</Box>
                <Box component={"li"} mb={2} fontWeight={"normal"} >Resend</Box>
            <Typography fontWeight={"bold"}>Email:</Typography>
            <Typography mb={2} fontSize={14}>
              ancricoma_angelo@hotmail.com
            </Typography>
            <Typography fontWeight={"bold"}>GitHub:</Typography>
            <Typography
              component={Link}
              href="https://github.com/angeloChoque"
              target="_blank"
              fontSize={14}
              mb={2}
            >
              https://github.com/angeloChoque
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default AboutPage;
