"use client";
import { addTask } from "@/api/api";
import { ITasks } from "@/types/tasks";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { MaskedInput } from "antd-mask-input";

interface MyFormProps {
  onCancel: () => void;
  onAddtask: (task: ITasks) => void;
  isModalOpen: boolean;
  newTaskValue: string;
  setNewTaskValue: (value: string) => void;
}
const { Option } = Select;

export default function MyForm({ onCancel, onAddtask }: MyFormProps) {
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields(); // Сбросить поля формы
    onCancel(); // Закрыть модальное окно
  };
  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      const newTask = await addTask({
        ...values,
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
      form.resetFields();
      handleCancel();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const validatePhoneNumber = (rule: any, value: any) => {
    if (typeof value === "string" && value.replace(/\D/g, "").length < 11) {
      return Promise.reject(new Error("Номер слишком короткий"));
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
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
        name="phone"
        rules={[
          { required: true, message: "Введите номер телефона" },
          { validator: validatePhoneNumber, message: "Номер слишком короткий" },
        ]}
      >
        <MaskedInput mask={"+7(000)0000-000"} />
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
      <Form.Item
        label="Код ATI"
        name="atiCode"
        rules={[
          {
            required: true,
            message: "Введите код ATI",
          },
          {
            message: "Код должен быть из цифр",
            pattern: new RegExp(/^[0-9]+$/),
          },
          { min: 4, message: "Минимум 4 цифры" },
          { max: 6, message: "максимум 6 цифр" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
        <Button className="mr-4" type="primary" htmlType="submit">
          Сохранить
        </Button>
        <Button danger onClick={handleCancel}>
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
}
