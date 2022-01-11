export interface ISets extends IOrigin {
  id: number;
  title: string;
  description: string;
  editorId: number;
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

export interface IOrigin {
  collectionId: number;
  creatorId: number;
}

export interface ISolve {
  problemId: number;
  choice: number;
}

export interface IRate {
  setId: number;
  userRate: number;
  totalRate: number;
}

export interface ISelect {
  total: number;
  info: Object;
}
