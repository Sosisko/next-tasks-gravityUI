"use client";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import MyModal from "./MyModal";
import { ITasks } from "@/types/tasks";

interface addTasksProps {
  onAddtask: (task: ITasks) => void;
}

export default function AddTask({ onAddtask }: addTasksProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTask = () => {
    console.log(newTaskValue);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={showModal} className="mt-4 mb-6" icon={<PlusOutlined />}>
        Добавить заявку
      </Button>
      <MyModal
        onAddtask={onAddtask}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        newTaskValue={newTaskValue}
        setNewTaskValue={setNewTaskValue}
      />
    </>
  );
}
