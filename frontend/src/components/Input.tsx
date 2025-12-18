type InputProps = {
    label: string;
    type?: string;
    value?: string;
    name: string;
    id?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rightIcon?: React.ReactNode;
    onIconClick?: () => void;
};

export const Input = (props: InputProps) => {
    return (
        <div className="flex flex-col mb-4 w-full">
            <label htmlFor={props.id || props.name} className="text-sm font-medium text-(--text)">
                {props.label}
            </label>

            <div className="relative w-full">
                <input 
                    type={props.type || "text"} 
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    id={props.id || props.name}
                    className={`
                        mt-1 p-2 pr-10 rounded-xs border border-(--text-hover)
                        bg-(--background) text-(--text)
                        focus:outline-none focus:border-(--cta)
                        ${props.className || ""}    
                    `}
                />
                {props.rightIcon && (
                    <span
                        className="absolute text-2xl right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={props.onIconClick}
                    >
                        {props.rightIcon}
                    </span>
                )}
            </div>
        </div>
    )
}