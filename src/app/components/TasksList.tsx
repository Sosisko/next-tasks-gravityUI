"use client";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Button } from "antd";
import { ITasks } from "@/types/tasks";
import { useState } from "react";
import { deleteTask } from "@/api/api";
import { updateTask } from "@/api/api";
import AddTask from "../components/AddTask";
import EditTask from "./EditTask";

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
  const [taskList, setTaskList] = useState(tasks);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<ITasks | null>(null);

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
          <Button
            onClick={() => onEditTask(record.id)}
            className="mr-2"
            icon={<EditOutlined />}
          ></Button>
          <Button
            onClick={() => onDeleteTask(record.id)}
            danger
            icon={<DeleteOutlined />}
          ></Button>
        </>
      ),
    },
  ];

  const onAddtask = (newTask: ITasks) => {
    setTaskList((prevTaskList) => [...prevTaskList, newTask]);
    console.log(newTask);
  };

  const onEditTask = (id: number) => {
    const taskToEdit = taskList.find((task) => task.id === id);
    if (taskToEdit) {
      setIsEditTaskOpen(true);
      setCurrentTask(taskToEdit);
      console.log(taskToEdit);
    }
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
    fio: `${task.secondname} ${task.name} ${task.surname}`,
    atiCode: (
      <a target="_blank" href={`https://ati.su/firms/${task.atiCode}/info`}>
        {task.atiCode}
      </a>
    ),
  }));

  const handleEditTask = (updatedTask: ITasks) => {
    setTaskList(
      taskList.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsEditTaskOpen(false);
  };
  return (
    <div>
      <AddTask onAddtask={onAddtask} />
      <Table columns={columns} dataSource={dataSource} />
      <EditTask
        isModalOpen={isEditTaskOpen}
        handleOk={handleEditTask}
        handleCancel={() => setIsEditTaskOpen(false)}
        task={currentTask || ({} as ITasks)}
      />
    </div>
  );
}
