import { addTask } from "@/api/api";
import { ITasks } from "@/types/tasks";
import type { FormProps } from "antd";

import { Button, Form, Input, InputNumber, Select } from "antd";

interface MyFormProps {
  onCancel: () => void;
  onAddtask: (task: ITasks) => void;
}
const { Option } = Select;
export default function MyForm({ onCancel, onAddtask }: MyFormProps) {
  const onFinish: FormProps["onFinish"] = async (values) => {
    const capitalFirstLetter = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    const fullName = `${capitalFirstLetter(
      values.secondname.trim()
    )} ${capitalFirstLetter(values.name.trim())} ${capitalFirstLetter(
      values.surname.trim()
    )}`;

    const newValues = { ...values };
    delete newValues.secondname;
    delete newValues.name;
    delete newValues.surname;

    try {
      const newTask = await addTask({
        ...newValues,
        fio: fullName,
        date: new Date(Date.now()).toLocaleString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      console.log("New task added:", newTask);
      onAddtask(newTask);
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
      initialValues={{ status: "Новая" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Фамилия"
        name="secondname"
        rules={[
          { required: true, whitespace: false, message: "Введите Фамилию" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: "Введите Имя" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Отчество"
        name="surname"
        rules={[{ required: true, message: "Введите Отчество" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Компания"
        name="company"
        rules={[{ required: true, message: "Введите название компании" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Телефон"
        name="Phone"
        rules={[
          { required: true, message: "Please input your phone number!" },
          {
            pattern: /^(\d{3})-(\d{3})-(\d{4})$/,
            message: "Invalid phone number format!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Комментарий"
        name="comment"
        rules={[{ required: false }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="status" label="Статус" rules={[{ required: true }]}>
        <Select
          disabled
          placeholder="Статус"
          onChange={(value) => console.log(value)}
          allowClear
        >
          <Option value="Новая">Новая</Option>
          <Option value="В работе">В работе</Option>
          <Option value="Завершено">Завершено</Option>
        </Select>
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
