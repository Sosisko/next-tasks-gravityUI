"use client";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useState } from "react";
import MyModal from "./MyModal";
import { ITasks } from "@/types/tasks";

export default function AddTask() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      <MyModal isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </>
  );
}
