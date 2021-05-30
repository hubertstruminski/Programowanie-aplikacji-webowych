import { INote } from "./INote";

export interface IFirebaseGet {
  size: number;
  items: INote[]
}

export interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}

export function isITimestamp(value: any) : value is ITimestamp { 
  const v: ITimestamp = value;
  return (typeof v.seconds === "number") && (typeof v.nanoseconds === "number")
}