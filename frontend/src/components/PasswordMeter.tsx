type PasswordMeterProps = {
    password: string;
}

export const PasswordMeter = ({ password }: PasswordMeterProps) => {
    const getPasswordStrength = () => {
        let score = 0;

        if (password.length >= 6) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[\W]/.test(password)) score += 1;
        return score;
    };

    const score = getPasswordStrength();
    const width = (score / 4) * 100;
    
    let label = "";
    let color = "";
    
    switch (score) {
        case 0:
        case 1:
            label = "Weak";
            color = "bg-neutral-700";
            break;
        case 2:
            label = "Medium";
            color = "bg-neutral-500";
            break;
        case 3:
            label = "Strong";
            color = "bg-neutral-300";
            break;
        case 4:
            label = "Very Strong";
            color = "bg-(--success)";
            break;
        default:
            label = "";
            color = "";
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="h-1 w-full bg-neutral-800 rounded">
                <div
                    className={`${color} h-1 rounded`}
                    style={{ width: `${width}%` }}
                />
            </div>
            <span className="text-xs font-medium text-(--text) text-right w-full">{label}</span>
        </div>
    )
}