export function isValidPuzzleDate(date: string | undefined): boolean {
    if (!date) return false;

    return /^\d{4}-\d{2}-\d{2}$/.test(date);
}