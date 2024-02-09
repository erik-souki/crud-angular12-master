import { Times } from './times';

export interface Student {
  _id: string;
  name: string;
  ra: string;
  team: string;
  times?: Times[];
}
