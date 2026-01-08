export const usePageMotion = () => {
  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return { variants, initial: "initial", animate: "animate", exit: "exit" };
};