import { addTask } from "@/api/api";
import { ITasks } from "@/types/tasks";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

interface MyFormProps {
  onCancel: () => void;
}

export default function MyForm({ onCancel }: MyFormProps) {
  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      const newTask = await addTask(values);
      console.log("New task added:", newTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 500 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="fio"
        name="fio"
        rules={[{ required: true, message: "Введите имя" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
        <Button className="mr-4" type="primary" htmlType="submit">
          Сохранить
        </Button>
        <Button danger onClick={onCancel}>
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
}
