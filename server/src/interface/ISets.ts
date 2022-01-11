import { Timestamp } from 'typeorm';

export interface ICollection {
  collectionId: number;
  createdAt: Timestamp;
}

export interface ISets {
  id: number;
  collectionId: number;
  title: string;
  description: string;
  creatorId: number;
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
