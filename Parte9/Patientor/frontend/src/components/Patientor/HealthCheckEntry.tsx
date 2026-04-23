import type { HealthCheckEntry } from "../../types";
import MedicationIcon from '@mui/icons-material/Medication';

const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {

    return (
        <div>
            <div style={{ display: 'flex', alignItems: "center", gap: '5px' }}>
                <div>{entry.date}</div>
                <MedicationIcon />
            </div>
            <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
            <div>Diagnose by {entry.specialist}</div>
        </div>
    )

}

export default HealthCheckEntry