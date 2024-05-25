import { Box, Container, Typography } from "@mui/material";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily.js";
import { COLOR_2 } from '../../assets/color/colors.js'
import PropTypes from "prop-types";

const Title = ({ title, Icon }) => {
  return (
    <Box component="header" py={1} bgcolor={COLOR_2}>
      <Container>
        <Typography
          py={1}
          variant="h3"
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
  Icon: PropTypes.object,
};

export default Title;
