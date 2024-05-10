import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import Title from "../../components/header/Title";
import { FORM_ITEM } from "../../data/Items";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import { COLOR_2 } from "../../assets/color/colors";
import { UseEmployee } from "../../context/EmployeeContext";
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

const InformationPage = () => {
    const { getEmployee } = UseEmployee();
    const params = useParams();
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        if (params.id) {
            getEmployee(params.id)
                .then(data => {
                    setEmployee(data);
                })
                .catch(error => {
                    console.error("Error getting employee:", error);
                });
        }
    }, [params.id, getEmployee]);

    return (
        <>
            <Title title="Employee Information" />
            <Container>
                <Grid container spacing={2} mt={1}>
                    <Grid xl={5} item >
                        <Paper sx={{ borderRadius: "22px" }} elevation={1}>
                            <Typography p={2}
                                borderRadius="22px 22px 0px 0px"
                                color={"white"} align="center"
                                bgcolor={COLOR_2}
                                fontFamily={FONT_FAMILY}
                                variant="h4" >
                                Personal information
                            </Typography>
                            {
                                FORM_ITEM.map(item => (
                                    <Stack key={item.id} px={3} direction="row" py={2.5}>
                                        <Typography fontFamily={FONT_FAMILY} flexGrow={1}>
                                            {item.Title}:
                                        </Typography>
                                        <Typography mr={1} >
                                            {item.Type === "Date"
                                                ? dayjs.utc(employee[item.Name]).format("DD/MM/YYYY")
                                                : employee[item.Name]}
                                        </Typography>
                                    </Stack>
                                ))
                            }
                        </Paper>
                    </Grid>
                    <Grid item xl={7}>
                        <Paper sx={{ borderRadius: "22px" }}>
                            <Typography p={2} borderRadius="22px 22px 0px 0px" color={"white"} align="center" bgcolor={COLOR_2} fontFamily={FONT_FAMILY} variant="h4" >
                                Task
                            </Typography>
                            <Typography p={2}>
                                asdsd
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default InformationPage;
