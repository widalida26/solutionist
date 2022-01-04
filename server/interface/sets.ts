export interface ISets {
  title: string;
  description: string;
  problems: IProblems[];
}

interface IProblems {
  id: number;
  index: number;
  question: string;
  answer: number;
  explanation: string;
  isOX: boolean;
  choices: IChoices[];
}

interface IChoices {
  id: number;
  index: number;
  content: number;
}
