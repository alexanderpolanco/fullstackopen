
import type { NewPatient, Gender, NewEntry, Diagnosis } from "../types/types.ts";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
    return param === 'male' || param === 'female' || param === 'other';
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect data: a new patient must be provided');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: String(object.name),
            dateOfBirth: String(object.dateOfBirth),
            ssn: String(object.ssn),
            gender: parseGender(object.gender),
            occupation: String(object.occupation),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect data: a new patient must be provided');
}

export enum HealthCheckRating {
    Healthy = 0,
    LowRisk = 1,
    ModerateRisk = 2,
    HighRisk = 3,
    VeryHighRisk = 4
}

const isHealthCheckRating = (value: unknown): value is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(value as HealthCheckRating);
};

const parseHealthCheckRating = (value: unknown) => {
    if (value === undefined || value === null || typeof value !== 'number' || !isHealthCheckRating(value)) {
        throw new Error('Incorrect healthCheckRating');
    }
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const validateEntry = (entry: NewEntry) => {

    console.log('entry', entry);

    if (!entry.type) {
        throw new Error('Missing type');
    }

    if (!entry.date) {
        throw new Error('Missing date');
    }

    if (!entry.description) {
        throw new Error('Missing description');
    }

    if (!entry.specialist) {
        throw new Error('Missing specialist');
    }

    switch (entry.type) {
        case 'HealthCheck':
            if (entry.healthCheckRating === undefined || entry.healthCheckRating === null) {
                throw new Error('Missing healthCheckRating');
            }
            else {
                parseHealthCheckRating(entry.healthCheckRating);
            }
            break;
        case 'OccupationalHealthcare':
            if (!entry.employerName) {
                throw new Error('Missing employerName');
            }
            else if (!entry.sickLeave || !entry.sickLeave.startDate || !entry.sickLeave.endDate) {
                throw new Error('startDate and endDate are required');
            }
            break;
        case 'Hospital':
            if (!entry.discharge || !entry.discharge.date || !entry.discharge.criteria) {
                throw new Error('Criterial date and criteria are required');
            }
            break;
        default:
            assertNever(entry);
    }

}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {

    console.log('object', object);

    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        throw new Error('Missing diagnosisCodes');
    }

    const diagnosisCodes = object.diagnosisCodes as Array<Diagnosis['code']>;

    if (diagnosisCodes.length === 0) {
        throw new Error('Missing diagnosisCodes');
    }

    return diagnosisCodes
};


export { toNewPatient, validateEntry, parseDiagnosisCodes };