import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type SceneWipeProps = {
  onComplete: () => void;
  trigger: boolean;
};

export const SceneWipe = ({ onComplete, trigger }: SceneWipeProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!trigger) return;

    controls.start({
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    }).then(() => {
      onComplete();
    });
  }, [trigger]);

  return (
    <motion.div
      initial={{ opacity: 0 }} 
      animate={controls}
      style={{ backgroundColor: "var(--background)" }}
      className="absolute inset-0 bg-(--cta) z-50 pointer-events-none"
    />
  );
};