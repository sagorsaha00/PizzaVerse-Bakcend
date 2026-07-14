import express from 'express'
import { Request, Response } from 'express'
import cors from 'cors'
import { connectToMongoDB } from './src/database/connect'
import userRouter from './src/router/router'


const app = express()
app.use(express.json())
const port = 3001
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})



app.use(userRouter)


app.listen(port, () => {
    connectToMongoDB()
    console.log("server to mongodb connected")
    console.log(`Server is running at http://localhost:${port}`)
})
