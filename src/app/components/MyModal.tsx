"use client";
import { ITasks } from "@/types/tasks";
import { Button, Modal } from "@gravity-ui/uikit";
import Test from "../test/Test";
import { useState } from "react";

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

      <Test onCancel={handleCancel} onAddtask={onAddtask} />
    </Modal>
  );
}
