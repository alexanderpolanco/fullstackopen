import type { Patient, NonSensitivePatient, NewEntry, Entry } from '../types/types.ts';
import patients from '../data/patients.ts'
import { toNewPatient, validateEntry, parseDiagnosisCodes } from '../utils/utils.ts'

import { v1 as uuid } from 'uuid'

const getEntries = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addEntry = (id: string, entry: NewEntry) => {
    try {
        const patient = findPatientById(id);
        validateEntry(entry);
        const diagnosisCodes = parseDiagnosisCodes(entry);
        const newEntry = entry as Entry;
        newEntry.id = uuid();
        newEntry.diagnosisCodes = diagnosisCodes;
        if (patient) {
            patient.entries.push(newEntry);
        }
        return newEntry;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Unknown error');
    }
}


const findPatientById = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = (object: unknown) => {
    const newPatient = toNewPatient(object) as Patient;
    newPatient.id = uuid();

    patients.push(newPatient);
    return newPatient;
}

export {
    getEntries,
    addPatient,
    findPatientById,
    addEntry
};