import type { OccupationalHealthcareEntry } from "../../types";
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

const OccupationalHealthcareEntry = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: "center", gap: '5px' }}>
                <div>{entry.date}</div>
                <LocalPharmacyIcon />
            </div>
            <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
            <div>Diagnose by {entry.specialist}</div>
        </div>
    )
}

export default OccupationalHealthcareEntry