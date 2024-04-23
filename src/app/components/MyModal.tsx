import { Modal } from "antd";
import MyForm from "./MyForm";
import { ITasks } from "@/types/tasks";

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
    <Modal centered open={isModalOpen} onCancel={handleCancel} footer={null}>
      <MyForm
        isModalOpen={isModalOpen}
        onAddtask={onAddtask}
        onCancel={handleCancel}
        newTaskValue={newTaskValue}
        setNewTaskValue={setNewTaskValue}
      />
    </Modal>
  );
}
