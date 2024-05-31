import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { ITEM } from "../../data/Items.jsx";
import { COLOR } from "../../assets/color/colors.js";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily.js";
import Title from "../../components/header/Title.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Title title="Home" />
      <Container component={"section"} sx={{ my: 2 }}>
        <Typography variant="h5" fontFamily={FONT_FAMILY}>
          Welcome to the information app
        </Typography>
        <Grid container spacing={3} my={1}>
          {ITEM.slice(1).map((item) => {
            return (
              <Grid item xs={12} md={6} mb={2} key={item.Title}>
                <Card elevation={1}>
                  <CardActionArea component={Link} to={item.Path}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        fontFamily={FONT_FAMILY}
                        color={COLOR}
                        display={"flex"}
                        gutterBottom
                      >
                        {item.Icon}
                        {item.Title}
                      </Typography>
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        component="div"
                        color={COLOR}
                      >
                        {item.SubTitle}
                      </Typography>
                      <Typography variant="body2" pb={2}>
                        {item.content}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography pl={1} fontWeight={"bold"}>
                        {item.SubTitle} {">"}
                      </Typography>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
