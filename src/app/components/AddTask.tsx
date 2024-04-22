"use client";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import MyModal from "./MyModal";

export default function AddTask() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
