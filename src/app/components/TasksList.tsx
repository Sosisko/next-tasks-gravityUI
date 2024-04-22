"use client";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Button } from "antd";
import { ITasks } from "@/types/tasks";
interface ColumnsType {
  title: string;
  dataIndex: string;
  key: string;
  render?: () => React.ReactNode;
}
interface tasksProps {
  tasks: ITasks[];
}

const columns: ColumnsType[] = [
  {
    title: "№ заявки",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "ФИО",
    dataIndex: "fio",
    key: "fio",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Комментарий",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "Статус",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "ATI код",
    dataIndex: "atiCode",
    key: "atiCode",
  },
  {
    title: "",
    dataIndex: "",
    key: "x",
    render: () => (
      <>
        <Button className="mr-2" icon={<EditOutlined />}></Button>
        <Button danger icon={<DeleteOutlined />}></Button>
      </>
    ),
  },
];

export default function TasksList({ tasks }: tasksProps) {
  const dataSource = tasks.map((task) => ({ ...task, key: task.id }));
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
