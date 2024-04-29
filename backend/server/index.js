import { ConnectDB, PORT } from '../DataBase.js'
import app from '../app.js'

ConnectDB()


app.listen(PORT)

console.log('server in running port ',PORT) ;