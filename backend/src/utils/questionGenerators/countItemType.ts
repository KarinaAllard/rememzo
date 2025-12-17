export function generateCountOptions(
    correct: number,
    optionCount: number
): { text: string; isCorrect: boolean }[] {
    const half = Math.floor(optionCount / 2);
    
    let start = Math.max(0, correct - half);
    let end = start + optionCount - 1;

    if (start === 0) {
        end = optionCount -1;
    }

    const values = Array.from(
        { length: optionCount },
        ( _, i) => start + i
    );

    return values.map(value => ({
        text: value.toString(),
        isCorrect: value === correct
    }));
}