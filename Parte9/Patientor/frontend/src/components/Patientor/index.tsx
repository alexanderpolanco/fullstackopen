import React, { useEffect, useState } from "react";
import { Patient, Entry } from "../../types";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";
import FormEntry from "./FormEntry";

const GenderIcon = ({ gender }: { gender: string }) => {
    if (gender === 'male') {
        return <MaleIcon />;
    }
    if (gender === 'female') {
        return <FemaleIcon />;
    }
    return null;
};

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};


const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntry entry={entry} />;
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const Patientor = () => {
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchPatient = async () => {
                const patient = await patientService.getById(id);
                setPatient(patient);
            };
            fetchPatient();
        }
    }, [id]);

    if (!patient) {
        return <div>Patient not found</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: "center", gap: '10px' }}>
                <h2>{patient.name}</h2>
                <GenderIcon gender={patient.gender} />
            </div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <FormEntry setPatient={setPatient as React.Dispatch<React.SetStateAction<Patient>>} patientId={patient.id} />
            <h3>Entries</h3>
            {patient.entries.map((entry) => (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <EntryDetails key={entry.id} entry={entry} />
                </div>
            ))}
        </div>
    );
};

export default Patientor;