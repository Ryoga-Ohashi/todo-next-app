import { getAllTodos } from "./api";
import AddTask from "./components/AddTask";
import ToDoList from "./components/TodoList";
import AppHeader from "./components/header";

export default async function Home() {
  const todos = await getAllTodos();
  console.log(todos);

  return (
    <main>
      <AppHeader />
      <div>
        <AddTask />
        <ToDoList todos={todos} />
      </div>
    </main>
  );
}
