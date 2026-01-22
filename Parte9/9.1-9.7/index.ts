import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';


const app = express();
app.use(express.json());


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


app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing' });
        return;
    }
    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, Number(target));
    res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});