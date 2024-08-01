"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { addTodo } from "../api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Button, Input, Form, Space ,message} from 'antd';

export default function AddTask() {
  const router = useRouter();

  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    // e.preventDefault();
    if (!newTaskValue){
      message.error("タスクを入力してください。")
        return
    }
    await addTodo({ id: uuidv4(), task: newTaskValue , isComplete:false});
    setNewTaskValue("");

    router.refresh();
  };

  return (
    <Form onFinish={handleSubmit}>
      <Space.Compact style={{ width: '100%' }}>
      <Input
        placeholder="New task..."
        value={newTaskValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTaskValue(e.target.value)
        }
        type="text"
        
      />
      <Button type="primary" htmlType="submit">
        Add task
      </Button>
      </Space.Compact>
    </Form>
  );
}
