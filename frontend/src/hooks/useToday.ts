export const useToday = () => {
    return new Date().toISOString().split("T")[0];
};