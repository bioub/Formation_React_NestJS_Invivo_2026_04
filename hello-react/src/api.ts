import type { Todo } from "./model";

interface TodoJSONPlaceholder {
    userId:    number;
    id:        number;
    title:     string;
    completed: boolean;
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json() as TodoJSONPlaceholder[];
  return data.slice(0, 20).map((todo) => {
    return {
      id: String(todo.id),
      title: todo.title,
      completed: todo.completed,
    };
  });
}
