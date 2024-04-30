"use client";

import {
  Table,
  TableAction,
  TableActionGroup,
  TableColumnConfig,
  TableDataItem,
  ThemeProvider,
  withTableActions,
} from "@gravity-ui/uikit";
import { ITasks } from "@/types/tasks";
import { useEffect, useState } from "react";
import { deleteTask } from "@/api/api";
import AddTask from "../components/AddTask";
import EditTaskTest from "./EditTaskTest";
import EditTask from "./EditTask";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface tasksProps {
  tasks: ITasks[];
  setTasks: React.Dispatch<React.SetStateAction<ITasks[]>>;
  router: AppRouterInstance;
}
type TableActionConfig<I> = TableAction<I> | TableActionGroup<I>;
export default function TasksList({ tasks, setTasks, router }: tasksProps) {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<ITasks | null>(null);
  useEffect(() => {
    setTasks(tasks);
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

  const onAddtask = (newTask: ITasks) => {
    setTasks((prevTaskList) => [...prevTaskList, newTask]);
  };

  const onEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
      setIsEditTaskOpen(true);
    }
  };

  const onDeleteTask = (id: number) => {
    if (confirm("Точно удалить?")) {
      setTasks(tasks.filter((task) => task.id !== id));
      deleteTask(id);
    }
  };

  const dataSource = tasks.map((task, idx) => ({
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
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
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

      <EditTaskTest
        isModalOpen={isEditTaskOpen}
        handleEditTask={handleEditTask}
        handleCancel={handleCancel}
        task={currentTask || ({} as ITasks)}
      />
      {/* <EditTask
        isModalOpen={isEditTaskOpen}
        handleEditTask={handleEditTask}
        handleCancel={handleCancel}
        task={currentTask || ({} as ITasks)}
      /> */}
      <p>Количество заявок: {tasks.length}</p>
    </div>
  );
}
