
import type { NewPatient, Gender } from "../types/types.ts";

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
            occupation: String(object.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect data: a new patient must be provided');
}

export default toNewPatient;