import { Grid } from "@mui/material";
import DataBox from "../../components/data_box/DataBox";
import FormPage from "../../components/form/FormPage";

const Main = () => {
  return (
    <Grid item xl={10}>
      <Grid container spacing={3} px={{xs:2, lg:4}} mt={1}>
        <FormPage />
        <DataBox />
    </Grid>
    </Grid>
  );
};

export default Main;
