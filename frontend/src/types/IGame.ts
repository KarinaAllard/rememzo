export interface ISceneItem {
  _id: string;
  itemId: string;
  variation: string;
  state: string;
  slotIndex: number;
  x: number;
  y: number;
}

export interface IDailyPuzzle {
  _id: string;
  templateId: string;
  items: ISceneItem[];
  question: {
    questionText: string;
    options: {
      text: string;
      isCorrect: boolean;
      _id: string;
    }[];
  };
  questionId: string;
  timestamp: string;
  date: string;
}