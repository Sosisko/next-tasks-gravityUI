import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Button } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { ITasks } from "@/types/tasks";
interface ColumnsType {
  title: string;
  dataIndex: string;
  key: string;
}
interface tasksProps {
  tasks: ITasks[];
}

const dataSource: ITasks[] = [
  {
    id: 1,
    number: 1,
    date: "22.02.22",
    company: "ООО уляля",
    fio: "горбунков Смён Павлович",
    phone: "89655082145",
    comment: "Я еду еду",
    status: "выполнено",
    atiCode: 1234,
  },
];

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
    // render: () => (
    //   <>
    //     <Button className="mr-2" icon={<EditOutlined />}></Button>
    //     <Button danger icon={<DeleteOutlined />}></Button>
    //   </>
    // ),
    // render: () => <a>Ссылка</a>,
  },
];

export default function TasksList({ tasks }: tasksProps) {
  return (
    <div>
      <Table columns={columns} dataSource={tasks} />
    </div>
  );
}
