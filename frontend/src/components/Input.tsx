type InputProps = {
    label: string;
    type?: string;
    value?: string;
    name: string;
    id?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProps) => {
    return (
        <div className="flex flex-col mb-4 w-full">
            <label htmlFor={props.id || props.name} className="text-sm font-medium text-(--text)">
                {props.label}
            </label>

            <input 
                type={props.type || "text"} 
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                id={props.id || props.name}
                className={`
                    mt-1 p-2 rounded-xs border border-(--text-hover)
                    bg-(--background) text-(--text)
                    focus:outline-none focus:border-(--cta)
                    ${props.className || ""}    
                `}
            />
        </div>
    )
}