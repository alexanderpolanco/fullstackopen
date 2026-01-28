import express from 'express';
import patientsRouter from './routes/patients.ts';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())


app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/patients', patientsRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});