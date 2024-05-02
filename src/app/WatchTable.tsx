"use client";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { ITasks } from "@/types/tasks";
import { Table, ThemeProvider, withTableSorting } from "@gravity-ui/uikit";
import React from "react";

interface tasksProps {
  tasks: ITasks[];
}
const theme = "light";

const MyTable = withTableSorting(Table);
const columns = [
  {
    id: "idx",
    name: "№ заявки",
    meta: { sort: true },
  },
  { id: "date", name: "Дата", meta: { sort: true } },
  { id: "fio", name: "ФИО", meta: { sort: true } },
  { id: "company", name: "Название компании" },
  { id: "phone", name: "Телефон" },
  { id: "status", name: "Статус" },
  { id: "atiCode", name: "ATI код" },
];

const WatchTable: React.FC<tasksProps> = ({ tasks }) => {
  const data = tasks.map((task, idx) => {
    return {
      ...task,
      idx: ++idx,
      fio: `${task.secondname} ${task.name} ${task.surname}`,
      atiCode: (
        <a target="_blank" href={`https://ati.su/firms/${task.atiCode}/info`}>
          {task.atiCode}
        </a>
      ),
      status:
      task.status === "new"
        ? "Новая"
        : task.status === "inWork"
        ? "В работе"
        : task.status === "done"
        ? "Завершено"
        : task.status,
    };
  });

  return (
    <div className="mt-6">
      <ThemeProvider theme={theme}>
        <MyTable
          columns={columns}
          data={data}
          className="w-full flex justify-center"
        />
      </ThemeProvider>
    </div>
  );
};

export default WatchTable;
