"use client";
import { Button } from "@gravity-ui/uikit";
import { Icon } from "@gravity-ui/uikit";
import { useState } from "react";
import MyModal from "./MyModal";
import { ITasks } from "@/types/tasks";
import { SquarePlus } from "@gravity-ui/icons";

interface addTasksProps {
  onAddtask: (task: ITasks) => void;
}

export default function AddTask({ onAddtask }: addTasksProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={showModal}
          view="raised"
          size="l"
          className="mt-4 mb-6"
        >
          Добавить заявку
          <Icon data={SquarePlus} size={18} />
        </Button>
      </div>

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
