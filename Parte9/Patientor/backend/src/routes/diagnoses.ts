import express from 'express';
import { getDiagnosisCodes } from '../services/diagnoses.ts'

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(getDiagnosisCodes());
})

export default router;