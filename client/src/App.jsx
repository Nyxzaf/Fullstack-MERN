import { Grid } from '@mui/material'
import Header from '../pages/MenuPage/Header'
import Main from '../pages/MenuPage/Main'
import DrawerHome from '../pages/Home/DrawerHome'
import Home from '../pages/Home/Home'
import { Route, Routes } from "react-router-dom";
import Task from '../pages/Task/Task'


function App() {

  return (
    <Grid container>
      <DrawerHome/>
      <Header/> 
      <Routes>
        <Route
        path='/'
        element={<Home/>}
        />
        <Route
        path='/Main'
        element={<Main/>}
        />        <Route
        path='/task'
        element={<Task/>}
        />
      </Routes>
    </Grid>
  )
}

export default App
