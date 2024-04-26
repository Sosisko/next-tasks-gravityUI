"use client";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { Table } from "antd";
import {
  Table,
  TableAction,
  TableActionGroup,
  TableColumnConfig,
  TableDataItem,
  ThemeProvider,
  withTableActions,
} from "@gravity-ui/uikit";
import { Button } from "antd";
import { ITasks } from "@/types/tasks";
import { useEffect, useState } from "react";
import { deleteTask } from "@/api/api";
import AddTask from "../components/AddTask";
import EditTask from "./EditTask";

interface tasksProps {
  tasks: ITasks[];
  router: any;
}
type TableActionConfig<I> = TableAction<I> | TableActionGroup<I>;
export default function TasksList({ tasks, router }: tasksProps) {
  const [taskList, setTaskList] = useState(tasks);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<ITasks | null>(null);
  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const columns: TableColumnConfig<TableDataItem>[] = [
    { id: "idx", name: "№ заявки" },
    { id: "date", name: "Дата" },
    { id: "company", name: "Компания" },
    { id: "fio", name: "ФИО" },
    { id: "phone", name: "Телефон" },
    { id: "comment", name: "Комментарий" },
    { id: "atiCode", name: "ATI код" },
    { id: "status", name: "Статус" },
  ];
  const getRowActions = (): TableActionConfig<TableDataItem>[] => {
    return [
      {
        text: "Редактировать",
        handler: (tasks) => {
          onEditTask(tasks.id);
        },
      },
      {
        text: "Удалить",
        handler: (tasks) => {
          onDeleteTask(tasks.id);
        },
        theme: "danger",
      },
    ];
  };
  // const columns: TableColumnConfig<ColumnsType>[] = [
  //   {
  //     title: "№ заявки",
  //     dataIndex: "idx",
  //     key: "idx",
  //   },
  //   {
  //     title: "Дата",
  //     dataIndex: "date",
  //     key: "date",
  //   },
  //   {
  //     title: "Компания",
  //     dataIndex: "company",
  //     key: "company",
  //   },
  //   {
  //     title: "ФИО",
  //     dataIndex: "fio",
  //     key: "fio",
  //   },
  //   {
  //     title: "Телефон",
  //     dataIndex: "phone",
  //     key: "phone",
  //   },
  //   {
  //     title: "Комментарий",
  //     dataIndex: "comment",
  //     key: "comment",
  //   },
  //   {
  //     title: "Статус",
  //     dataIndex: "status",
  //     key: "status",
  //   },
  //   {
  //     title: "ATI код",
  //     dataIndex: "atiCode",
  //     key: "atiCode",
  //   },
  //   {
  //     title: "",
  //     dataIndex: "",
  //     key: "x",
  //     render: (record) => (
  //       <>
  //         <Button
  //           onClick={() => onEditTask(record.id)}
  //           className="mr-2"
  //           icon={<EditOutlined />}
  //         ></Button>
  //         <Button
  //           onClick={() => onDeleteTask(record.id)}
  //           danger
  //           icon={<DeleteOutlined />}
  //         ></Button>
  //       </>
  //     ),
  //   },
  // ];

  const onAddtask = (newTask: ITasks) => {
    setTaskList((prevTaskList) => [...prevTaskList, newTask]);
  };

  const onEditTask = (id: number) => {
    const taskToEdit = taskList.find((task) => task.id === id);
    if (taskToEdit) {
      setIsEditTaskOpen(true);
      setCurrentTask(taskToEdit);
    }
  };

  const onDeleteTask = (id: number) => {
    if (confirm("Точно удалить?")) {
      setTaskList(taskList.filter((task) => task.id !== id));
      deleteTask(id);
    }
  };

  const dataSource = taskList.map((task, idx) => ({
    ...task,
    // idx: ++idx,
    idx: (
      <a
        onClick={() => router.push(`/task-detail/${task.id}`)}
        className="cursor-pointer"
      >
        {++idx}
      </a>
    ),
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
    setCurrentTask(null);
  };

  const handleCancel = () => {
    setIsEditTaskOpen(false);
    setCurrentTask(null);
  };
  const MyTable = withTableActions(Table);

  return (
    <div>
      <AddTask onAddtask={onAddtask} />
      <ThemeProvider theme="light">
        <MyTable
          columns={columns}
          data={dataSource}
          getRowActions={getRowActions}
        />
      </ThemeProvider>

      <EditTask
        isModalOpen={isEditTaskOpen}
        handleEditTask={handleEditTask}
        handleCancel={handleCancel}
        task={currentTask || ({} as ITasks)}
      />
      <p>Количество заявок: {taskList.length}</p>
    </div>
  );
}
