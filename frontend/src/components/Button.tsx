type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            type={props.type || "button"}
            onClick={props.onClick}
            className={`
                    relative px-4 py-2 bg-(--cta) text-neutral-100 cursor-pointer rounded-sm
                    before:content-[''] before:absolute before:left-0 before:top-0
                    before:h-0.5 before:w-full
                    before:bg-linear-to-r before:from-(--cta) before:via-(--text) before:to-(--cta)
                    hover:bg-(--cta-hover) hover:before:from-(--cta-hover) hover:before:via-(--text-hover) hover:before:to-(--cta-hover)
                    hover:text-white hover:bg-linear-to-b hover:from-(--cta) hover:to-(--cta-hover)
                    after:content-[''] after:absolute after:left-0 after:bottom-0
                    after:h-0.5 after:w-full
                    after:bg-(--cta-hover) hover:after:bg-(--dark-purple)
                    ${props.className || ""}
                `}
        >
            {props.children}
        </button>
    );
};