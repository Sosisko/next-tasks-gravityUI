import { Modal } from "antd";

interface ModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function MyModal({
  isModalOpen,
  handleOk,
  handleCancel,
}: ModalProps) {
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
