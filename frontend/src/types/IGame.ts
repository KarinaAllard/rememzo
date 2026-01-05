export interface ISceneItem {
  _id: string;
  itemId: string;
  name: string;
  type: string;
  variation: string;
  state: string;
  slotIndex: number;
  x: number;
  y: number;
  artRef: string[];
}

export interface IDailyPuzzle {
  _id: string;
  templateId: string;
  template?: {
    _id: string;
    name: string;
    backgroundRef: string;
    maxItems: number;
    slots: {
      index: number;
      x: number;
      y: number;
      allowedTypes: string[];
    }[];
  };
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