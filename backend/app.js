import express from 'express';
import cors from 'cors';
import router from './routes/user.js';

const app=express();
app.use(cors());
app.use('/api/users',router);

export default app;