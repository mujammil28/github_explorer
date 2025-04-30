import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';

const app=express();
app.use(cors());
app.use('app/users',userRoutes);

export default app;