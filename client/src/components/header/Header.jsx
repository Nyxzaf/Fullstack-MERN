import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily.js";
import { COLOR } from "../../assets/color/colors.js";
import MenuHeader from "../../components/header/MenuHeader";
import { IMG_1 } from "../../assets/img/images.js";
import { ITEM } from "../../data/Items";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      sx={{
        background: "white",
        display: { xs: "block", lg: "none", xl: "none" },
      }}
      position={"sticky"}
    >
      <Toolbar>
        <Box flexGrow={1}>
          <Link to="/">
            <img src={IMG_1} height={80} width={90} alt="Logo" />
          </Link>
        </Box>
        <Stack
          direction={"row"}
          spacing={3}
          alignItems={"center"}
          display={{ xs: "none", sm: "block" }}
        >
          {ITEM.map((item) => {
            return (
              <Typography
                key={item.Title}
                component={Link}
                to={item.Path}
                color={COLOR}
                fontFamily={FONT_FAMILY}
                fontSize={20}
                sx={{
                  textShadow: "2px 2px 4px rgba(1,1,10,0.10)",
                  textDecoration: "none",
                }}
              >
                {item.Title}
              </Typography>
            );
          })}
        </Stack>
        <MenuHeader />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
