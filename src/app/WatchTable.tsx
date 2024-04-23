"use client";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { ITasks } from "@/types/tasks";
import {
  Button,
  Select,
  Table,
  ThemeProvider,
  withTableSorting,
} from "@gravity-ui/uikit";
import React from "react";

interface tasksProps {
  tasks: ITasks[];
}
const theme = "light";
const select = (
  <Select defaultValue={["val_1"]}>
    <Select.Option value="val_1">Value 1</Select.Option>
    <Select.Option value="val_2">Value 2</Select.Option>
    <Select.Option value="val_3">Value 3</Select.Option>
    <Select.Option value="val_4">Value 4</Select.Option>
  </Select>
);

const button = <Button view="outlined">Button</Button>;
const getRowId = "id";

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
