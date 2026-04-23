import { diagnosisCodes } from '../data/diagnosisCodes.ts';
import type { Diagnosis } from '../types/types.ts';

const getDiagnosisCodes = (): Diagnosis[] => {
    return diagnosisCodes;
};

export {
    getDiagnosisCodes
};