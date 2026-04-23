import React, { useState, useEffect } from "react";
import { Input, Button, Alert } from '@mui/material';
import { EntryType } from "../../constants";
import { Patient, EntryWithoutId, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import MultiSelect from "../MultiSelect/MultiSelect";
import { getAllDiagnoses } from "../../services/diagnoses";
import { AxiosError } from "axios";

interface props {
    setPatient: React.Dispatch<React.SetStateAction<Patient>>;
    patientId: string;
}

export default function FormEntry({ setPatient, patientId }: props) {
    const [type, setType] = useState(EntryType.HealthCheck);
    const [date, setDate] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [specialist, setSpecialist] = useState<string>("");
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
    const [employerName, setEmployerName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [criteriaDate, setCriteriaDate] = useState<string>("");
    const [criteria, setCriteria] = useState<string>("");
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    const [diagnosisSelected, setDiagnosisSelected] = useState<string[]>([]);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        void getAllDiagnoses().then((diagnoses) => {
            setDiagnoses(diagnoses);
        });
    }, []);

    const getNewEntry = (): EntryWithoutId => {
        const baseEntry = {
            date,
            description,
            specialist,
            diagnosisCodes: diagnosisSelected,
        };
        switch (type) {
            case EntryType.HealthCheck:
                return {
                    ...baseEntry,
                    type: EntryType.HealthCheck,
                    healthCheckRating,
                };
            case EntryType.OccupationalHealthcare:
                return {
                    ...baseEntry,
                    type: EntryType.OccupationalHealthcare,
                    employerName,
                    sickLeave: startDate && endDate ? { startDate, endDate } : undefined
                };
            case EntryType.Hospital:
                return {
                    ...baseEntry,
                    type: EntryType.Hospital,
                    discharge: {
                        date: criteriaDate,
                        criteria: criteria
                    }
                };
        }
    };

    const clearForm = () => {
        setType(EntryType.HealthCheck);
        setDate("");
        setDescription("");
        setSpecialist("");
        setDiagnosisSelected([]);
        setHealthCheckRating(0);
        setEmployerName("");
        setStartDate("");
        setEndDate("");
        setCriteriaDate("");
        setCriteria("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEntry = getNewEntry();

        patientService.addEntry(patientId, newEntry).then((addedEntry) => {
            if (addedEntry) {
                setPatient(state => ({ ...state, entries: [...state.entries, addedEntry] }));
                clearForm();
            }
        }).catch((error:unknown) => {
            if (error instanceof AxiosError && error?.response?.data) {
                setError(error.response.data);
            } else {
                setError("Unknown error");
            }
            setTimeout(() => setError(null), 5000);
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}
            <div style={{ display: "flex", flexDirection: "column", maxWidth: "300px", gap: "5px", border: "1px solid #ccc", padding: "10px", marginBottom: "10px", marginTop: "10px" }}>
                <label htmlFor="type">Type</label>
                <select name="type" id="type" onChange={(e) => setType(e.target.value as EntryType)}>
                    {Object.values(EntryType).map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <label htmlFor="date">Date</label>
                <Input type="date" name="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <label htmlFor="description">Description</label>
                <Input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="specialist">Specialist</label>
                <Input type="text" name="specialist" id="specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)} />
                <label htmlFor="diagnosisCodes">Diagnosis Codes</label>
                <MultiSelect options={diagnoses} diagnosisSelected={diagnosisSelected} setDiagnosisSelected={setDiagnosisSelected} />

                {/*<input type="text" name="diagnosisCodes" id="diagnosisCodes" onChange={(e) => setDiagnosisCodes(e.target.value)} />*/}
                <label htmlFor="healthCheckRating" style={{ display: type === 'HealthCheck' ? 'block' : 'none' }}>Health Check Rating</label>
                <Input type="number" name="healthCheckRating" id="healthCheckRating" value={healthCheckRating} style={{ display: type === 'HealthCheck' ? 'block' : 'none' }} onChange={(e) => setHealthCheckRating(Number(e.target.value))} />
                <label htmlFor="employerName" style={{ display: type === 'OccupationalHealthcare' ? 'block' : 'none' }}>Employer Name</label>
                <Input type="text" name="employerName" id="employerName" value={employerName} style={{ display: type === 'OccupationalHealthcare' ? 'block' : 'none' }} onChange={(e) => setEmployerName(e.target.value)} />
                <label htmlFor="startDate" style={{ display: type === 'OccupationalHealthcare' ? 'block' : 'none' }}>Start Date</label>
                <Input type="date" name="startDate" id="startDate" value={startDate} style={{ display: type === 'OccupationalHealthcare' ? 'block' : 'none' }} onChange={(e) => setStartDate(e.target.value)} />
                <label htmlFor="endDate" style={{ display: type === 'OccupationalHealthcare' ? 'block' : 'none' }}>End Date</label>
                <Input type="date" name="endDate" id="endDate" value={endDate} style={{ display: type === 'OccupationalHealthcare' ? 'block' : 'none' }} onChange={(e) => setEndDate(e.target.value)} />
                <label htmlFor="criteriaDate" style={{ display: type === 'Hospital' ? 'block' : 'none' }}>Criteria Date</label>
                <Input type="date" name="criteriaDate" id="criteriaDate" value={criteriaDate} style={{ display: type === 'Hospital' ? 'block' : 'none' }} onChange={(e) => setCriteriaDate(e.target.value)} />
                <label htmlFor="criteria" style={{ display: type === 'Hospital' ? 'block' : 'none' }}>Criteria</label>
                <Input type="text" name="criteria" id="criteria" value={criteria} style={{ display: type === 'Hospital' ? 'block' : 'none' }} onChange={(e) => setCriteria(e.target.value)} />
            </div>
            <div style={{ display: "flex", flexDirection: "row", maxWidth: "300px", gap: "5px", border: "1px solid #ccc", padding: "10px", marginBottom: "10px", marginTop: "10px" }}>
                <Button type="submit" variant="contained" color="primary">Add Entry</Button>
                <Button variant="contained" color="secondary" onClick={clearForm}>Cancel</Button>
            </div>
        </form>
    )
}