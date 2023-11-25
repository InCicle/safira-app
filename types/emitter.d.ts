export type EmitterEventsMetadata<T> = {
  [P in keyof T]: { key: string; execute: (args: T[P]) => void }[];
};

export type OnRegisterFunc<T> = <P extends keyof T>(name: P, ...rest: ((args: T[P]) => void)[]) => string[];

export type EmitFunc<T> = <P extends keyof T>(name: P, args?: T[P]) => void;

export type CreateNewEventListFunc<T> = <P extends keyof T>(
  name: P,
  eventCalls: { key: string; execute: (args: T[P]) => void }[],
) => void;

export type AddNewEventsInToListFunc<T> = <P extends keyof T>(
  name: P,
  eventCalls: { key: string; execute: (args: T[P]) => void }[],
) => void;

export type DeleteEventFunc<T> = <P extends keyof T>(name: P, key?: string) => void;

export interface IEmitter<T = any> {
  on: OnRegisterFunc<T>;
  emit: EmitFunc<T>;
  events: EmitterEventsMetadata<T> | null;
  createNewEventList: CreateNewEventListFunc<T>;
  addNewEventsInList: AddNewEventsInToListFunc<T>;
  remove: DeleteEventFunc<T>;
}
