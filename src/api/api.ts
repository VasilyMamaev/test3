import { TaskType } from "../types/types";

export const getTasks = async () => {
  let response = await fetch("http://jsonplaceholder.typicode.com/todos");
  let tasks: Array<TaskType> = await response.json();
  return tasks;
};

export const getNames = async () => {
  let response = await fetch("http://jsonplaceholder.typicode.com/users");
  let names = await response.json();
  names = names.map((user: { id: number; name: string }) => ({
    id: user.id,
    name: user.name,
  }));
  return names;
};
