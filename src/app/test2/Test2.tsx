"use client";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Select, TextArea, TextInput, ThemeProvider } from "@gravity-ui/uikit";
import { useState } from "react";
export default function Test() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      secondname: "",
      surname: "",
      company: "",
      phone: "",
      comment: "",
      status: "Новая",
      atiCode: "",
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <div className="container">
      <div className="max-w-2xl">
        <ThemeProvider theme="light">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              {...register("name")}
              label="Имя"
              placeholder="Ваше имя"
            />
            <TextInput
              {...register("secondname")}
              label="Фамилия"
              placeholder="Ваша фамилия"
            />
            <TextInput
              {...register("surname")}
              label="Отчество"
              placeholder="Ваше отчество"
            />
            <TextInput
              {...register("company")}
              label="Компания"
              placeholder="Ваша компания"
            />
            <TextInput
              {...register("phone")}
              label="Телефон"
              placeholder="Ваш телефон"
            />
            <TextArea {...register("comment")} placeholder="Комментарий" />

            <Controller
              name="status"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <Select
                  onUpdate={(value) => onChange(value[0])}
                  defaultValue={["Новая"]}
                >
                  <Select.Option value="Новая">Новая</Select.Option>
                  <Select.Option value="В работе">В работе</Select.Option>
                  <Select.Option value="Завершено">Завершено</Select.Option>
                </Select>
              )}
            />

            <TextInput
              type="number"
              {...register("atiCode")}
              label="ATI код"
              placeholder="Ваш ATI код"
            />
            <button type="submit">ОК</button>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
}
