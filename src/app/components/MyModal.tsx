"use client";
import { ITasks } from "@/types/tasks";
import { Modal } from "@gravity-ui/uikit";
import MyForm from "./MyForm";

interface ModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  onAddtask: (task: ITasks) => void;
  newTaskValue: string;
  setNewTaskValue: (value: string) => void;
}

export default function MyModal({
  isModalOpen,
  handleCancel,
  onAddtask,
  newTaskValue,
  setNewTaskValue,
}: ModalProps) {
  return (
    <Modal open={isModalOpen} onClose={handleCancel}>
      {/* <MyForm
        isModalOpen={isModalOpen}
        onAddtask={onAddtask}
        onCancel={handleCancel}
        newTaskValue={newTaskValue}
        setNewTaskValue={setNewTaskValue}
      /> */}

      <MyForm onCancel={handleCancel} onAddtask={onAddtask} />
    </Modal>
  );
}
