type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	type?: "button" | "submit";
	className?: string;
	disabled?: boolean;
	variant?: "primary" | "secondary" | "muted" | "option" | "selected";
	loading?: boolean;
};

const baseClasses = `
    relative px-4 py-2 cursor-pointer font-bold rounded-sm
    before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0
    before:h-[2px] before:w-5/6
    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0
    after:h-0.5 after:w-5/6
`;

const variantClasses = {
	primary: `
        bg-(--cta) text-white
        before:bg-linear-to-r before:from-(--cta) before:via-(--shine) before:to-(--cta) 
        after:bg-linear-to-r after:from-(--cta) after:via-(--dark-cta) after:to-(--cta)
        hover:text-white hover:bg-linear-to-b hover:from-(--cta) hover:to-(--cta-hover)
        hover:before:from-(--cta) hover:before:via-(--shine) hover:before:to-(--cta) 
        hover:after:bg-linear-to-r hover:after:from-(--cta-hover) hover:after:via-(--dark-cta) hover:after:to-(--cta-hover)
    `,
	secondary: `
        bg-gray-700 text-(--secondary-text) before:bg-linear-to-r before:from-gray-700 before:via-neutral-200 before:to-gray-700
        after:bg-linear-to-r after:from-gray-700 after:via-gray-800 after:to-gray-700 
        hover:bg-linear-to-b hover:from-gray-600 hover:to-gray-700
        hover:before:from-gray-600 hover:before:via-neutral-300 hover:before:to-gray-600 
        hover:after:bg-linear-to-r hover:after:from-gray-700 hover:after:via-gray-800 hover:after:to-gray-700
    `,
	muted: `
        bg-gray-400 text-gray-900 before:bg-linear-to-r before:from-gray-400 before:via-gray-200 before:to-gray-400 
        after:bg-linear-to-r after:from-gray-400 after:via-gray-600 after:to-gray-400 
        hover:text-gray-900 hover:bg-linear-to-b hover:from-gray-300 hover:to-gray-400
        hover:before:from-gray-300 hover:before:via-gray-200 hover:before:to-gray-300 
        hover:after:bg-linear-to-r hover:after:from-gray-400 hover:after:via-gray-600 hover:after:to-gray-400
    `,
	option: `
        bg-(--background) text-(--text) text-2xl
        hover:text-white hover:bg-neutral-900 font-normal
        border-1 border-(--background)
    `,
	selected: `
        bg-neutral-900 text-(--text) text-2xl
        hover:text-white hover:bg-neutral-800 font-bold
        border-1 border-white
    `,
};

export const Button = (props: ButtonProps) => {
	const { loading, disabled } = props;
	const variant = props.disabled ? "muted" : props.variant ?? "primary";
	return (
		<button
			type={props.type || "button"}
			onClick={props.onClick}
			disabled={disabled || loading}
			className={`
                    ${baseClasses}
                    ${variantClasses[variant]}
                    ${props.className || ""}
                `}
		>
			{loading && (
				<span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2 inline-block"></span>
			)}
			{props.children}
		</button>
	);
};
