import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});


app.get('/bmi', (_req, res) => {
    if (!_req.query.height || !_req.query.weight) {
        res.status(400).send({ error: 'Missing height or weight' });
        return;
    }
    if (isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight))) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }

    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    const bmi = calculateBmi(height, weight);

    res.send({ weight, height, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});