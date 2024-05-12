import { Button, Card , Container, Grid, Paper, Typography } from "@mui/material";
import Title from "../../components/header/Title";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SendIcon from "@mui/icons-material/Send";
import { FONT_FAMILY } from "../../assets/fonts/FontFamily";
import { useState } from "react";
import { DndContext, closestCenter }  from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy , arrayMove } from '@dnd-kit/sortable'
import CardTask from "../../components/card/CardTask";

export default function TaskDragAndDrop() {

    const [people, setPeople] = useState([
        {name: "jhon", id:1},
        {name: "Juan", id:2},
        {name: "jose", id:3}
    ]);


    const handleDrag = (e)=>{
        const { active , over }= e
        const oldIndex = people.findIndex(person => person.id === active.id)
        const newIndex = people.findIndex(person => person.id === over.id)
        const newOrder = arrayMove(people , oldIndex ,newIndex)
        setPeople(newOrder);

    }


  return (
    <>
        <Title title="Task" Icon={PlaylistAddCheckIcon} />
        <Container>
            <Typography variant="h5" my={2}>
                Here new tasks for employees are added.
            </Typography>
            <Button 
            variant="outlined"
            endIcon={<SendIcon />}
            sx={{mb:3}}
            >
                Add New Task
            </Button>
            <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDrag}
            >
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12} >
                        <Paper sx={{borderRadius:"20px"}}>
                            <Typography borderRadius="22px 22px 0px 0px" bgcolor={"Grey"} py={1} fontFamily={FONT_FAMILY} fontSize={30} color={"white"} align="center">
                                Backlog
                            </Typography>
                            <SortableContext items={people} strategy={verticalListSortingStrategy}>
                                <Grid container spacing={1} p={2}>
                                {people.map((person) =>{
                                    return(
                                        <Grid item md={12} xs={6}  key={person.id}>
                                            <CardTask user={person}/>
                                        </Grid>
                                    )
                                })}
                                </Grid>
                            </SortableContext>
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                    <Paper sx={{borderRadius:"20px"}}>
                        <Typography borderRadius="22px 22px 0px 0px" bgcolor={"yellow"} py={1} fontFamily={FONT_FAMILY} fontSize={30} color={"white"} align="center">
                            In Progress
                        </Typography>
                        <Card>
                            medium
                        </Card>
                    </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                    <Paper sx={{borderRadius:"20px"}}>
                        <Typography borderRadius="22px 22px 0px 0px" bgcolor={"Green"} py={1} fontFamily={FONT_FAMILY} fontSize={30} color={"white"} align="center">
                            Done
                        </Typography>
                        <Card>
                            Done
                        </Card>
                    </Paper>
                    </Grid>
                </Grid>
            </DndContext>
        </Container>
    </>
  );
}
