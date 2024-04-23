"use client";
import { ITasks } from "@/types/tasks";
import { Button, Select, Table, ThemeProvider } from "@gravity-ui/uikit";
import React from "react";

interface tasksProps {
  tasks: ITasks[];
}

const select = <Select defaultValue={["val_1"]}>
<Select.Option value="val_1">Value 1</Select.Option>
<Select.Option value="val_2">Value 2</Select.Option>
<Select.Option value="val_3">Value 3</Select.Option>
<Select.Option value="val_4">Value 4</Select.Option>
</Select>

const button = <Button view="outlined">Button</Button>
const getRowId = 'id';

const data = [
  {id: 1, name: 'Hello', company: button, status: select },
  {id: 2, name: 'World', company: button, status: select}
];

// const columns = [{ id: "id" }, { id: "text" }, { id: "age" }];
const columns = [
  { id: "id", name: "Номер заявки" },
  { id: "name", name: "ФИО" },
  { id: "company", name: "Название компании" },
  { id: "status", name: "Статус" },
];

const MyTable: React.FC<tasksProps> = ({ tasks }) => {
  
  const theme = "light";
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
