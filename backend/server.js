import express from 'express';
import cors from 'cors';
const app = express();
import router from './routes/user.js';
app.use(cors());
app.use('/api', router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
