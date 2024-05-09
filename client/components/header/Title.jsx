import { Box, Container, Typography } from "@mui/material";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import PropTypes from "prop-types";

const Title = ({ title, Icon }) => {
  return (
    <Box component="header" bgcolor={"#339194"}>
      <Container>
        <Typography
          py={1}
          variant="h4"
          fontFamily={FONT_FAMILY}
          color={"#FFFFFF"}
          fontWeight={"bold"}
          display={"flex"}
          alignItems={"center"}
        >
          {Icon && <Icon sx={{ fontSize: "inherit", mr: 1 }} />}
          {title}
        </Typography>
      </Container>
    </Box>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.element,
};

export default Title;
