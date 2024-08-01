"use client"
import { Task } from "@/types/tasks";
import Todo from "./Todo";
import { Divider, List } from "antd";
import style from "./TodoList.module.css";

interface TodoListProps {
  todos: Task[];
}

export default function ToDoList({ todos }: TodoListProps) {
  const incompleteTodos = todos.filter(todo => !todo.isComplete);
  const completeTodos = todos.filter(todo => todo.isComplete);

  return (
    <div className={`${style.listcontainer}`}>
      <Divider orientation="left">Incomplete Todos</Divider>
      <List
        bordered
        dataSource={incompleteTodos}
        renderItem={(todo) => (
          <Todo key={todo.id} todo={todo} />
        )}
      />
      <Divider orientation="left">complete Todos</Divider>
      <List
        bordered
        dataSource={completeTodos}
        renderItem={(todo) => (
          <Todo key={todo.id} todo={todo} />
        )}
      />
    </div>
  );

}
