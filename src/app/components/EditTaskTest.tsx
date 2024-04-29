import { Button, Modal } from "@gravity-ui/uikit";
import { Form, Input, Select } from "antd";
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
    const capitFirstLet = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const newValues = {
      ...values,
      name: capitFirstLet(values.name.trim()),
      secondname: capitFirstLet(values.secondname.trim()),
      surname: capitFirstLet(values.surname.trim()),
      company: values.company.trim(),
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
    updateTask(newValues);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCancel}>
      а чо
    </Modal>
  );
};

export default EditTask;
