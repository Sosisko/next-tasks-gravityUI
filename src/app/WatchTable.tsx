"use client";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { ITasks } from "@/types/tasks";
import { Button, Select, Table, ThemeProvider } from "@gravity-ui/uikit";
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

const data = [
  { id: 1, name: "Hello", company: button, status: select },
  { id: 2, name: "World", company: button, status: select },
];

// const columns = [{ id: "id" }, { id: "text" }, { id: "age" }];
const columns = [
  { id: "id", name: "№ заявки" },
  { id: "date", name: "Дата" },
  { id: "fio", name: "ФИО" },
  { id: "company", name: "Название компании" },
  { id: "phone", name: "Телефон" },

  { id: "status", name: "Статус" },
  { id: "atiCode", name: "ATI код" },
];

const MyTable: React.FC<tasksProps> = ({ tasks }) => {
  const data = tasks.map((task) => {
    return {
      ...task,
      fio: `${task.secondname} ${task.name} ${task.surname}`,
      atiCode: (
        <a target="_blank" href={`https://ati.su/firms/${task.atiCode}/info`}>
          {task.atiCode}
        </a>
      ),
    };
  });

  return (
    <ThemeProvider theme={theme}>
      <Table
        columns={columns}
        data={data}
        className="w-full flex justify-center"
      />
    </ThemeProvider>
  );
};

export default MyTable;
