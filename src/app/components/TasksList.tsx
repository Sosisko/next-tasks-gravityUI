"use client";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Button } from "antd";
import { ITasks } from "@/types/tasks";
import { useState } from "react";
import AddTask from "../components/AddTask";
import { deleteTask } from "@/api/api";

interface ColumnsType {
  title: string;
  dataIndex: string;
  key: string;
  render?: (record: any) => React.ReactNode;
}
interface tasksProps {
  tasks: ITasks[];
}

export default function TasksList({ tasks }: tasksProps) {
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
      title: "Компания",
      dataIndex: "company",
      key: "company",
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
      render: (record) => (
        <>
          <Button className="mr-2" icon={<EditOutlined />}></Button>
          <Button
            onClick={() => onDeleteTask(record.id)}
            danger
            icon={<DeleteOutlined />}
          ></Button>
        </>
      ),
    },
  ];

  const [taskList, setTaskList] = useState(tasks);
  const onAddtask = (newTask: ITasks) => {
    setTaskList((prevTaskList) => [...prevTaskList, newTask]);
    console.log(newTask);
  };

  const onDeleteTask = (id: number) => {
    if (confirm("Точно удалить?")) {
      setTaskList(taskList.filter((task) => task.id !== id));
      deleteTask(id);
    }
  };

  const dataSource = taskList.map((task) => ({
    ...task,
    key: task.id,
    number: task.id,
    atiCode: (
      <a target="_blank" href={`https://ati.su/firms/${task.atiCode}/info`}>
        {task.atiCode}
      </a>
    ),
  }));

  return (
    <div>
      <AddTask onAddtask={onAddtask} />
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
}
