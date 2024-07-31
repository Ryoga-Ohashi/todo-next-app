import { Task } from "@/types/tasks";
import Todo from "./Todo";

interface TodoListProps {
  todos: Task[];
}

export default function ToDoList({ todos }: TodoListProps) {
  return (
    <ul className="space-y-3">
      {todos.map((todo:Task) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
