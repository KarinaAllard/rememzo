import { createContext, useContext, useState, type ReactNode } from "react";
import { Toast } from "../components/Toast";

type ToastContextType = {
  showToast: (message: string, variant?: "success" | "error" | "info") => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{ message: string; variant?: string } | null>(null);

  const showToast = (message: string, variant?: "success" | "error" | "info") => {
    setToast({ message, variant });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          variant={toast.variant as any}
          duration={2500}
          onClose={() => setToast(null)}
        >
          {toast.message}
        </Toast>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};