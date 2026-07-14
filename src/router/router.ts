import express from 'express'
import { Request, Response } from 'express'

import client from '../database/connect'
import { UserController } from '../controller/userController'

const router = express.Router()
const database = client.db("myDatabase") as unknown as string



const userController = new UserController(database)

router.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!')
})

router.post('/CreateUsers', (req: Request, res: Response) => {
    userController.createUser(req, res);
});
router.post("/loginUser", (req: Request, res: Response) => {
    userController.loginUser(req, res)
})
router.get('/getAllPizza', (req: Request, res: Response) => {
    userController.getAllPizza(req, res)
})
router.post('/createReserveBook', (req: Request, res: Response) => {
    userController.createReserveBook(req, res)
})
router.get("/getReserveBook", (req: Request, res: Response) => {
    userController.getReserveBook(req, res)
})


export default router