export interface ISets extends IOrigin {
  id: number;
  collectionId: number;
  title: string;
  description: string;
  editor: number;
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

export interface ISolve {
  problem: number;
  choice: number;
}

export interface IOrigin {
  creator: number;
  createdAt: string;
}
