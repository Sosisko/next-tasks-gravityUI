import { Modal } from "antd";
import MyForm from "./MyForm";
import { ITasks } from "@/types/tasks";

interface ModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
}

export default function MyModal({ isModalOpen, handleCancel }: ModalProps) {
  return (
    <Modal centered open={isModalOpen} onCancel={handleCancel} footer={null}>
      <MyForm onCancel={handleCancel} />
    </Modal>
  );
}
