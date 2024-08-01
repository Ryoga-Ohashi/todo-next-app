"use client";

import { Task } from "@/types/tasks";
import { useEffect, useRef, useState } from "react";
import { deleteTodo, updateTodo } from "../api";
import { useRouter } from "next/navigation";
import { Input, List, Button, Space, Typography, Checkbox, CheckboxProps } from "antd";
import { EditOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface TaskProps {
  todo: Task;
}


export default function Todo({todo}: TaskProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(todo.task);
  let updateIsComplete = todo.isComplete;
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = async () => {
    await updateTodo(todo.id, editedTaskText, todo.isComplete);
    setIsEditing(false);
    router.refresh();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTaskText(event.target.value);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    router.refresh();
  };

  const onCheck: CheckboxProps['onChange'] = async(e) => {
    updateIsComplete = !todo.isComplete;
    console.log(updateIsComplete);
    await updateTodo(todo.id, editedTaskText,updateIsComplete);
    router.refresh();
  };

  return (
    <List.Item
    key={todo.id}
      actions={[
        isEditing ? (
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSaveButtonClick}
          />
        ) : (
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={handleEditButtonClick}
          />
        ),
        <Button
          key={todo.id}
          type="default"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />,
      ]}
    >
     <Checkbox onChange={onCheck} checked={updateIsComplete} style={{ marginRight: 8 }} />
      {isEditing ? (
        <Input
          value={editedTaskText}
          onChange={handleInputChange}
        //   ref={inputRef}
        />
      ) : (
        <Text>{todo.task}</Text>
      )}
    </List.Item>
  );
}
