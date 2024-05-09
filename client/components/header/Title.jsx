import { Box, Container, Typography } from "@mui/material";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import PropTypes from "prop-types";

const Title = ({ title }) => {
  return (
    <Box component="header" bgcolor={"#339194"}>
      <Container>
        <Typography
          variant="h2"
          fontFamily={FONT_FAMILY}
          color={"#FFFFFF"}
          fontWeight={"bold"}
          display={"flex"}
          alignItems={"center"}
        >
          {title}
        </Typography>
      </Container>
    </Box>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
