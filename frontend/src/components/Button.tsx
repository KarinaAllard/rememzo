type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;
    disabled?: boolean;
    variant?: "primary" | "muted";
}

const baseClasses = `
    relative px-4 py-2 cursor-pointer font-bold rounded-sm
    before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0
    before:h-0.5 before:w-5/6
    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0
    after:h-0.5 after:w-5/6
`;

const variantClasses = {
    primary: `
        bg-(--cta) text-neutral-100
        before:bg-linear-to-r before:from-(--cta) before:via-(--text) before:to-(--cta) 
        after:bg-linear-to-r after:from-(--cta) after:via-(--dark-purple) after:to-(--cta)
        hover:text-white hover:bg-linear-to-b hover:from-(--cta) hover:to-(--cta-hover)
        hover:before:from-(--cta-hover) hover:before:via-(--text-hover) hover:before:to-(--cta-hover) 
        hover:after:bg-linear-to-r hover:after:from-(--cta-hover) hover:after:via-(--dark-purple) hover:after:to-(--cta-hover)
    `,
    muted: `
        bg-gray-400 text-(--dark-purple) before:bg-linear-to-r before:from-gray-400 before:via-gray-200 before:to-gray-400 
        after:bg-linear-to-r after:from-gray-400 after:via-gray-600 after:to-gray-400 
        hover:text-white hover:bg-linear-to-b hover:from-gray-400 hover:to-gray-500
        hover:before:from-gray-400 hover:before:via-gray-300 hover:before:to-gray-400 
        hover:after:bg-linear-to-r hover:after:from-gray-500 hover:after:via-gray-600 hover:after:to-gray-500`,
};

export const Button = (props: ButtonProps) => {
    const variant = props.variant ?? "primary";
    return (
        <button
            type={props.type || "button"}
            onClick={props.onClick}
            className={`
                    ${baseClasses}
                    ${variantClasses[variant]}
                    ${props.className || ""}
                `}
        >
            {props.children}
        </button>
    );
};