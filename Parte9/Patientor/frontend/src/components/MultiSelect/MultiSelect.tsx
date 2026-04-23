import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Diagnosis } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
};

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MultipleSelect({ options, diagnosisSelected, setDiagnosisSelected }: { options: Diagnosis[], diagnosisSelected: string[], setDiagnosisSelected: React.Dispatch<React.SetStateAction<string[]>> }) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof diagnosisSelected>) => {
        const {
            target: { value },
        } = event;
        setDiagnosisSelected(
            typeof value === 'string' ? value.split(',') : value,
        );
        
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Diagnosis codes</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={diagnosisSelected}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {options.map((item) => (
                        <MenuItem
                            key={item.code}
                            value={item.code}
                            style={getStyles(item.code, diagnosisSelected, theme)}
                        >
                            {item.code}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}