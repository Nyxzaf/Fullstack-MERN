import { Grid } from '@mui/material'
// import Header from '../pages/MenuPage/Header'
// import Main from '../pages/MenuPage/Main'
import DrawerHome from '../pages/Home/DrawerHome'
import Home from '../pages/Home/Home'


function App() {

  return (
    <Grid container>
      <DrawerHome/>
      <Home/>
      {/* <Header/>  */}
      {/* <Main/> */}
    </Grid>
  )
}

export default App
