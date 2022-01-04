export interface ISets {
  title: string;
  description: string;
}

export interface IProblems {
  id: number;
  index: number;
  question: string;
  answer: number;
  explanation: string;
  isOX: boolean;
}

export interface IChoices {
  id: number;
  index: number;
  content: number;
}
