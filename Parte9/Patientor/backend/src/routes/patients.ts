import express from 'express';
import { addPatient, getEntries } from '../services/patients.ts'

const router = express.Router();


router.get('/', (_req, res) => {
    res.send(getEntries());
})

router.post('/', (_req, res) => {
    const newPatient = addPatient(_req.body);

    res.json(newPatient);
})

export default router;