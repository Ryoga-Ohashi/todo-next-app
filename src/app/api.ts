// "use client"

import { Task } from "@/types/tasks";

const baseUrl = "http://api:8080";
const rendUrl = "http://localhost:8080";

const mapApiResponseToTask = (apiResponse: any): Task => ({
  id: apiResponse.ID,
  task: apiResponse.Task,
  isComplete: apiResponse.IsCompleted,
});

export const getAllTodos = async (): Promise<Task[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" }); //getserversideprops
  // const res = await fetch(`${baseUrl}/tasks`, { next: { revalidate: 30 } }); //getserversideprops
  const apiResponse = await res.json();
  return apiResponse.map(mapApiResponseToTask);
};

export const addTodo = async (todo: Task): Promise<Task> => {
  const res = await fetch(`${rendUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const updateTodo = async (
  id: string,
  newText: string
): Promise<Task> => {
  console.log(newText);
  const res = await fetch(`${rendUrl}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: newText }),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<Task> => {
  const res = await fetch(`${rendUrl}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deleteTodo = await res.json();
  return deleteTodo;
};
