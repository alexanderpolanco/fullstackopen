import type { HospitalEntry } from "../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div>
            <div style={{ display: 'flex', alignItems: "center", gap: '5px' }}>
                <div>{entry.date}</div>
                <LocalHospitalIcon />
            </div>
            <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
            <div>Diagnose by {entry.specialist}</div>
        </div>
    )
}

export default HospitalEntry