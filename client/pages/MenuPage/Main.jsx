import { Grid } from "@mui/material";
import DataBox from "../../components/data_box/DataBox";
import FormPage from "../../components/form/Form";

const Main = () => {
  return (
    <Grid container spacing={3} px={{xs:2, lg:4}} mt={1}>
      <FormPage />
      <DataBox />
    </Grid>
  );
};

export default Main;
