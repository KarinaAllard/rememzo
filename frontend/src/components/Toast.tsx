import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ToastProps = {
    children: React.ReactNode;
    duration: number;
    onClose?: () => void;
    variant?: "success" | "error" | "info";
};

const variantClasses = {
    success: "bg-(--success) text-neutral-900",
    error: "bg-(--dark-cta) text-white",
    info: "bg-neutral-400 text-neutral-900",
};

export const Toast = ({ children, duration = 2500, onClose, variant = "success" }: ToastProps) => {
    const [visible, setVisible] = useState(true);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setExiting(true), duration)
        
        return () => clearTimeout(timer);
    }, [duration]);

    const handleAnimationComplete = () => {
        if (exiting) {
            setVisible(false);
            onClose?.();
        }
    };

    if (!visible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: exiting ? 0 : 1, y: exiting ? -20 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onAnimationComplete={handleAnimationComplete}
            className={`
                fixed top-4 right-4 z-50 px-4 py-2 rounded-sm font-bold shadow-md
                ${variantClasses[variant]}
                `}
        >
            {children}    
        </motion.div>
    )
}