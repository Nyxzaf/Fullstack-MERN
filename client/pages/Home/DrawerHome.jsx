import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { IMG_1 } from "../../assets/img/images.js";
import { ITEM } from "../../data/Items";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { COLOR } from "../../assets/color/colors.js";

const DrawerHome = ({ children }) => {
  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", lg: "block" },
          width: "185px",
          "& .MuiPaper-root": {
            position: "relative",
            height: "100vh",
            maxHeight: "100%",
            overflowY: "auto",
          },
        }}
      >
        <Toolbar>
          <Link to="/">
            <img src={IMG_1} width={"100%"} />
          </Link>
        </Toolbar>
        <Divider />
        {ITEM.map((item) => {
          return (
            <Box key={item.Title}>
              <Divider />
              <List>
                <Typography pl={2} color={COLOR} fontWeight={"bold"}>
                  {item.Title}
                </Typography>
                <ListItemButton
                  component={Link}
                  style={{ color: {COLOR} }}
                  to={item.Path}
                >
                  {item.Icon}
                  <ListItemText sx={{ alignText: "center", pl: 2 }}>
                    {item.SubTitle}
                  </ListItemText>
                </ListItemButton>
              </List>
            </Box>
          );
        })}
      </Drawer>
      <Box
        component={"main"}
        sx={{
          width: { xs: "100%", lg: "calc(100% - 185px)" },
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

DrawerHome.propTypes = {
  children: PropTypes.node,
};

export default DrawerHome;
