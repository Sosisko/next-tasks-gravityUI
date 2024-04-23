import { Modal, Form, Input, Select, Button } from "antd";
import { ITasks } from "@/types/tasks";
import { updateTask } from "@/api/api";
import { MaskedInput } from "antd-mask-input";
import { useEffect } from "react";

interface EditTaskProps {
  isModalOpen: boolean;
  handleEditTask: (task: ITasks) => void;
  handleCancel: () => void;
  task: ITasks;
}

const { Option } = Select;

const EditTask: React.FC<EditTaskProps> = ({
  isModalOpen,
  handleEditTask,
  handleCancel,
  task,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(task);
  }, [form, task]);

  const onFinish = (values: ITasks) => {
    const newValues = {
      ...values,
      id: task.id,
      date: new Date(Date.now()).toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      number: task.id,
    };
    handleEditTask(newValues);
    console.log(newValues);
    updateTask(newValues);
  };

  const validatePhoneNumber = (rule: any, value: any) => {
    if (typeof value === "string" && value.replace(/\D/g, "").length < 11) {
      return Promise.reject(new Error("Номер слишком короткий"));
    }
    return Promise.resolve();
  };

  return (
    <Modal
      centered
      open={isModalOpen}
      title="Редактирование заявки"
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={task}
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
          rules={[{ required: true, message: "Пожалуйста, введите компанию" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="phone"
          rules={[
            { required: true, message: "Введите номер телефона" },
            {
              validator: validatePhoneNumber,
              message: "Номер слишком короткий",
            },
          ]}
        >
          <MaskedInput mask={"+7(000)0000-000"} />
        </Form.Item>

        <Form.Item
          label="Комментарий"
          name="comment"
          rules={[{ required: false }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Статус" name="status">
          <Select>
            <Option value="Новая">Новая</Option>
            <Option value="В процессе">В процессе</Option>
            <Option value="Выполнена">Выполнена</Option>
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
    </Modal>
  );
};

export default EditTask;
