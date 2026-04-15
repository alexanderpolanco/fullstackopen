interface VisibilityProps {
    visibility: string;
    setVisibility: (visibility: string) => void;
}

export default function Visibility({ visibility, setVisibility }: VisibilityProps) {
    const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value);
    };
    return (
        <div>
            <label htmlFor="visibility">visibility
                great
                <input type="radio" name="visibility" id="great" value="great" checked={visibility === "great"} onChange={handleVisibilityChange} readOnly />
                good
                <input type="radio" name="visibility" id="good" value="good" checked={visibility === "good"} onChange={handleVisibilityChange} readOnly />
                ok
                <input type="radio" name="visibility" id="ok" value="ok" checked={visibility === "ok"} onChange={handleVisibilityChange} readOnly />
                poor
                <input type="radio" name="visibility" id="poor" value="poor" checked={visibility === "poor"} onChange={handleVisibilityChange} readOnly />
            </label>
        </div>
    )
}
