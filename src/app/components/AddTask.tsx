import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export default function AddTask() {
  return (
    <Button className="mt-4 mb-6" icon={<PlusOutlined />}>
      Добавить заявку
    </Button>
  );
}
