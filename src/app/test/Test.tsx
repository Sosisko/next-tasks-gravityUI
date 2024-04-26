"use client";

import { Select, TextArea, TextInput, ThemeProvider } from "@gravity-ui/uikit";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { useState } from "react";
export default function Test() {
  const [selectedOption, setSelectedOption] = useState(["Новая"]);
  const [newTasksValue, setNewTasksValue] = useState({
    name: "",
    secondname: "",
    surname: "",
    company: "",
    phone: "",
    comment: "",
    status: selectedOption[0],
    atiCode: "",
  });

  const handleSelectChange = (value: string[]) => {
    setSelectedOption(value);
    console.log(value);
    setNewTasksValue({
      ...newTasksValue,
      status: value[0],
    });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log(newTasksValue);
    // setNewTasksValue({
    //   name: "",
    //   secondname: "",
    //   surname: "",
    //   company: "",
    //   phone: "",
    //   comment: "",
    //   status: [],
    //   atiCode: "",
    // });
  };
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewTasksValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <div className="max-w-2xl">
        <ThemeProvider theme="light">
          <form onSubmit={onSubmit}>
            <TextInput
              value={newTasksValue.name}
              onChange={handleInputChange}
              label="Имя"
              name="name"
              placeholder="Ваше имя"
            />
            <TextInput
              value={newTasksValue.secondname}
              onChange={handleInputChange}
              label="Фамилия"
              name="secondname"
              placeholder="Ваша фамилия"
            />
            <TextInput
              value={newTasksValue.surname}
              onChange={handleInputChange}
              label="Отчество"
              name="surname"
              placeholder="Ваше отчество"
            />
            <TextInput
              value={newTasksValue.company}
              onChange={handleInputChange}
              label="Компания"
              name="company"
              placeholder="Ваша компания"
            />
            <TextInput
              value={newTasksValue.phone}
              onChange={handleInputChange}
              label="Телефон"
              name="phone"
              placeholder="Ваш телефон"
            />
            <TextArea
              value={newTasksValue.comment}
              onChange={(e) => handleInputChange(e)}
              name="comment"
              placeholder="Комментарий"
            />

            <Select
              name="status"
              defaultValue={["Новая"]}
              className="w-full"
              value={selectedOption}
              onUpdate={handleSelectChange}
            >
              <Select.Option value="Новая">Новая</Select.Option>
              <Select.Option value="В работе">В работе</Select.Option>
              <Select.Option value="Завершено">Завершено</Select.Option>
            </Select>

            <TextInput
              type="number"
              value={newTasksValue.atiCode}
              onChange={handleInputChange}
              label="ATI код"
              name="atiCode"
              placeholder="Ваш ATI код"
            />
            <button type="submit">ОК</button>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
}