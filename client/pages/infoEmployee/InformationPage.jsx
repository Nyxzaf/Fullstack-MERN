import { Box, Card, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
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
                        <Paper component={"section"}sx={{ borderRadius: "22px"}} elevation={1}>
                            <Typography 
                                p={2}
                                mb={0}
                                borderRadius="22px 22px 0px 0px"
                                color={"white"} align="center"
                                bgcolor={COLOR_2}
                                fontFamily={FONT_FAMILY}
                                variant="h4" >
                                Personal information
                            </Typography>
                            <Box component={"ul"} p={2} my={0} display={"flex"} flexDirection={"column"} gap={"0.65rem"}>
                            {
                                FORM_ITEM.map(item => (
                                    <Box component={"li"} key={item.id} sx={{listStyleType:"none"}}>
                                        <Typography fontFamily={FONT_FAMILY} fontSize={".85rem"} color={"primary"} fontWeight={"medium"}>
                                            {item.Title}:
                                        </Typography>
                                        <Typography >
                                            {item.Type === "Date"
                                                ? dayjs.utc(employee[item.Name]).format("DD/MM/YYYY")
                                                : employee[item.Name]}
                                        </Typography>
                                    </Box>
                                ))
                            }
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xl={7}>
                        <Paper sx={{ borderRadius: "22px" }}>
                            <Typography p={2 } borderRadius="22px 22px 0px 0px" color={"white"} align="center" bgcolor={COLOR_2} fontFamily={FONT_FAMILY} variant="h4" >
                                Task
                            </Typography>
                            <Box p={1}>
                            <Typography px={2} pt={1}>
                                Backlog:
                            </Typography>
                            <Paper sx={{mx:2, bgcolor:"grey"}} >
                                <Grid container >
                                    <Grid item xl={4} xs={12} >
                                        <Card sx={{mx:1, my:1}}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                                angelo
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                Realizar trabajos
                                            </Typography>
                                            <Typography pt={1}>
                                                28/03/2001
                                            </Typography>
                                        </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Paper>
                            <Typography px={2} pt={1}>
                                In Progress:
                            </Typography>
                            <Paper sx={{mx:2, bgcolor:"yellow"}} >
                                <Grid container>
                                    <Grid item xl={4} xs={12} >
                                    <Card sx={{mx:1, my:1}}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                                angelo
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                Realizar trabajos
                                            </Typography>
                                            <Typography pt={1}>
                                                28/03/2001
                                            </Typography>
                                        </CardContent>
                                        </Card>
                                    </Grid>
                                    
                                </Grid>
                            </Paper>
                            <Typography px={2} pt={1}>
                                Backlog:
                            </Typography>
                            <Paper sx={{mx:2,bgcolor:"red"}} >
                                <Grid container>
                                    <Grid item xl={4} xs={12} >
                                    <Card sx={{mx:1, my:1}}>
                                        <CardContent>
                                            <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                                angelo
                                            </Typography>
                                            <Typography variant="body2" component="div">
                                                Realizar trabajos
                                            </Typography>
                                            <Typography pt={1}>
                                                28/03/2001
                                            </Typography>
                                        </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Paper>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default InformationPage;
