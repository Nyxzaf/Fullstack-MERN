import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()
export const PORT  = process.env.PORT ?? 4000


export async function ConnectDB (){
    try {
        const DB = await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected to', DB.connection.name)
    } catch (error) {
        console.log(error)
    }
}