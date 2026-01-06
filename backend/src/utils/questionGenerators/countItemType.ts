import { IGeneratedItem } from "../itemGenerator";

type QuestionOption = { text: string; isCorrect: boolean };

export function generateCountItemTypeQuestion(
  sceneItems: IGeneratedItem[],
  requiredItemTypes: string[],
  templateText: string,
  optionsCount: number
): { questionText: string; options: QuestionOption[] } {

  const validItems = sceneItems.filter(item =>
    requiredItemTypes.includes(item.type)
  );

  if (!validItems.length) {
    throw new Error("No valid items for countItemType question");
  }

  const typesInScene = Array.from(
    new Set(validItems.map(item => item.type))
  );

  const selectedType =
    typesInScene[Math.floor(Math.random() * typesInScene.length)];

  const correctCount = validItems.filter(
    item => item.type === selectedType
  ).length;

  const options = generateCountOptions(correctCount, optionsCount);
  const questionText = templateText.replace("{type}", selectedType);

  return { questionText, options };
}

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