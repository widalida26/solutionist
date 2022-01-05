export interface ISetsDTO {
  title: string;
  description: string;
  problems: IProblems[];
}

export interface IProblems {
  id: number;
  index: number;
  question: string;
  answer: number;
  explanation: string;
  isOX: boolean;
  choices: IChoices[];
}

export interface IChoices {
  id: number;
  index: number;
  content: number;
}
