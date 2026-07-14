import { Request, Response } from 'express';

export class UserController {
    private database: any;
    constructor(database: any) {
        this.database = database;
    }
    createUser = async (req: Request, res: Response) => {
        console.log("createUser");
        try {
            console.log("Request Body:", req.body);
            const databas = this.database.collection("users");
            const { name, email, password } = req.body;
            console.log("Received data:", { name, email, password });

            if (await databas.findOne({ email: email })) {
                return res.status(409).json({ error: 'Email already exists' });
            }

            const newUser = { name, email, password };
            const newuser = await databas.insertOne(newUser);
            const fullUserData = {
                _id: newuser.insertedId,
                name,
                email,
                password
            };
            res.status(201).json({ user: fullUserData });

        } catch (error) {
            console.error("Controller Error:", error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
    loginUser = async (req: Request, res: Response) => {
        console.log("loginUser");
        const { email, password } = req.body;
        console.log("email", email, "pass", password)

        try {
            const databas = this.database.collection("users");
            const user = await databas.findOne({ email: email, password: password });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json({ user: user });

        } catch (error) {
            console.error("Controller Error:", error);
            res.status(500).json({ error: 'Failed to login user' });
        }
    }
    getAllPizza = async (req: Request, res: Response) => {
        console.log("get all PIzza")
        try {
            const databas = this.database.collection("pizzas");
            const getAllData = await databas.find({}).toArray();
            res.status(200).json({
                success: true,
                message: "All pizza data retrieved successfully!",
                data: getAllData
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch pizza data",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
    createReserveBook = async (
        req: Request,
        res: Response
    ) => {
        try {
            const {
                name,
                email,
                pizzaName,
                image,
                price,
                size,
                tableName,
                chairs,
                drinks,
            } = req.body;
            const bookData = {
                name,
                email,
                pizzaName,
                image,
                price,
                size,
                tableName,
                chairs,
                drinks,
            }
            const databas = this.database.collection("reserveBookData");
            const reservation = await databas.insertOne(bookData);
            console.log("reservation", reservation)
            return res.status(201).json({
                success: true,
                message: "Reservation created successfully.",
                data: reservation,
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    };
    getReserveBook = async (req: Request, res: Response) => {
        try {
            const { email } = req.query;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email query parameter is required."
                });
            }
            const collection = this.database.collection("reserveBookData");
            const data = await collection.aggregate([
                {
                    $match: { email: email }
                }
            ]).toArray();
            console.log("data", data);
            return res.status(200).json({
                success: true,
                data: data
            });

        } catch (error) {
            console.error("Error fetching reserved books:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}