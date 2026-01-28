import type { Patient } from '../types/types.ts';
import patientData from '../data/patients.ts'
import toNewPatient from '../utils/utils.ts'

import { v1 as uuid } from 'uuid'

const patients: Patient[] = patientData

const getEntries = (): Patient[] => {
    return patients;
};

const addPatient = (object: unknown) => {
    const newPatient = toNewPatient(object) as Patient;
    newPatient.id = uuid();

    patients.push(newPatient);
    return newPatient;
}

export {
    getEntries,
    addPatient
};