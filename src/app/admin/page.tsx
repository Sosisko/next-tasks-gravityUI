"use client";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export default function AdminPanel() {
  return (
    <div className="container">
      <div className="flex items-center justify-center flex-col mt-6">
        <h1 className="text-2xl font-bold">AdminPanel</h1>
        <Button className="mt-4" icon={<PlusOutlined />}>
          Добавить заявку
        </Button>
      </div>
    </div>
  );
}
