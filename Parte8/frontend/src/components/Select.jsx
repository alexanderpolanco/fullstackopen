import { useState } from 'react'
export const Select = ({ option, onChange = () => { } }) => {
    const [value, setValue] = useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
        onChange(event.target.value)
    }
    return (
        <select value={value} onChange={handleChange}>
            {option.map((option) => (
                <option key={option.name} value={option.name}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}
