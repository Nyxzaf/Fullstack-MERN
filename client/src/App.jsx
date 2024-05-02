import { Grid } from '@mui/material'
import DrawerHome from '../pages/Home/DrawerHome'
import Home from '../pages/Home/Home'
import { Route, Routes } from "react-router-dom";
import Task from '../pages/Task/Task'
import OperatorData from '../pages/menuPage/OperatorData'
import Header from '../components/header/Header'

function App() {


  return (
    <Grid container >
      <DrawerHome/>
      <Header/> 
      <Routes>
        <Route
        path='/'
        element={<Home/>}
        />
        <Route
        path='/Data'
        element={<OperatorData/>}
        />
        <Route
        path='/task'
        element={<Task/>}
        />
      </Routes>
    </Grid>
  )
}

export default App
