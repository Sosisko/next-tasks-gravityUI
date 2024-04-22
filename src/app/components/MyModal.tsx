import { Modal } from "antd";
import MyForm from "./MyForm";
import { ITasks } from "@/types/tasks";

interface ModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  onAddtask: (task: ITasks) => void;
}

export default function MyModal({
  isModalOpen,
  handleCancel,
  onAddtask,
}: ModalProps) {
  return (
    <Modal centered open={isModalOpen} onCancel={handleCancel} footer={null}>
      <MyForm onAddtask={onAddtask} onCancel={handleCancel} />
    </Modal>
  );
}
