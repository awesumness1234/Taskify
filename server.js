import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AuthRoutes from './Routes/AuthRoutes.js';
import toDoRoutes from './Routes/ToDoRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', AuthRoutes);
app.use('/api/todo',toDoRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});

mongoose.connect(process.env.DB_URL).then((result)=>{
    console.log("DB Connected Successfully!");
}).catch(err=>{
    console.log(err);
})
