import express from 'express';
import { addPatient, getEntries, findPatientById, addEntry } from '../services/patients.ts'

const router = express.Router();


router.get('/', (_req, res) => {
    res.send(getEntries());
})

router.get('/:id', (_req, res) => {
    const patient = findPatientById(_req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send('Patient not found');
    }
})

router.post('/', (_req, res) => {
    const newPatient = addPatient(_req.body);

    res.json(newPatient);
})

router.post('/:id/entries', (_req, res) => {
    try {
        const newEntry = addEntry(_req.params.id, _req.body);
        res.json(newEntry);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        }
        res.status(400).send('Unknown error');
    }
})

export default router;