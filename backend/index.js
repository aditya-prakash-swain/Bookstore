import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from "cors"

const app = express();

app.use(express.json()); // Parse incoming requests data as JSON

//middleware for handling cor policys
//app.use(cors());//allow all origins with default cors
app.use(cors({
    origin: "https://bookstore-mu-six.vercel.app",
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']

}
))
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to Bookstore');
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Error connecting to database:", error);
});
