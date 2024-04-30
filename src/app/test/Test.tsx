"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "@mona-health/react-input-mask";
import {
  Button,
  Select,
  TextArea,
  TextInput,
  ThemeProvider,
} from "@gravity-ui/uikit";
import React, { useState } from "react";
import { addTask } from "@/api/api";

const formSchema = yup.object({
  name: yup.string().required("Это поле обязательно"),
  secondname: yup.string().required("Это поле обязательно"),
  surname: yup.string().required("Это поле обязательно"),
  company: yup.string().required("Это поле обязательно"),
  phone: yup.string().min(16),
  comment: yup.string().optional(),
  status: yup.string().optional(),
  atiCode: yup.number().positive().integer().required().min(4),
});

export interface IFormData {
  name: string;
  secondname: string;
  surname: string;
  company: string;
  phone: string;
  comment?: string;
  status: string;
  atiCode: number | undefined;
}

export default function Test({ onCancel, onAddtask }: any) {
  const [btnLoading, setBtnLoading] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
      secondname: "",
      surname: "",
      company: "",
      phone: "",
      comment: "",
      status: "Новая",
      atiCode: undefined,
    },
  });

  const onSubmit: SubmitHandler<any> = async (data: IFormData) => {
    setBtnLoading(true);
    const capitFirstLet = (str: string) => {
      return str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    };

    const newTask = await addTask({
      ...data,
      date: new Date(Date.now()).toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      name: capitFirstLet(data.name.trim()),
      secondname: capitFirstLet(data.secondname.trim()),
      surname: capitFirstLet(data.surname.trim()),
      company: data.company.trim(),
    });

    onAddtask(newTask);
    console.log(data);
    onCancel();
    reset();
  };

  return (
    <div className="container">
      <div className="max-w-2xl pt-8 pb-8">
        <ThemeProvider theme="light">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              {...register("name")}
              label="Имя"
              placeholder="Ваше имя"
              errorMessage={errors.name && "Поле обязательно для заполнения"}
              validationState={errors.name ? "invalid" : undefined}
            />

            <TextInput
              {...register("secondname")}
              label="Фамилия"
              placeholder="Ваша фамилия"
              errorMessage={
                errors.secondname && "Поле обязательно для заполнения"
              }
              validationState={errors.secondname ? "invalid" : undefined}
            />

            <TextInput
              {...register("surname")}
              label="Отчество"
              placeholder="Ваше отчество"
              errorMessage={errors.surname && "Поле обязательно для заполнения"}
              validationState={errors.surname ? "invalid" : undefined}
            />
            <TextInput
              {...register("company")}
              label="Компания"
              placeholder="Ваша компания"
              errorMessage={errors.company && "Поле обязательно для заполнения"}
              validationState={errors.company ? "invalid" : undefined}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <InputMask
                  {...field}
                  mask="+7(999)999-99-99"
                  placeholder="+7(___)___-__-__"
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  maskPlaceholder={null}
                >
                  <TextInput
                    label="Телефон"
                    placeholder="Ваш телефон"
                    errorMessage={
                      errors.phone &&
                      "Это поле обязательно и должно содержать минимум 10 цифр"
                    }
                    validationState={errors.phone ? "invalid" : undefined}
                  />
                </InputMask>
              )}
            />

            <TextArea {...register("comment")} placeholder="Комментарий" />

            <Controller
              name="status"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  label="Статус"
                  disabled
                  onUpdate={(value) => onChange(value[0])}
                  defaultValue={["Новая"]}
                >
                  <Select.Option value="Новая">Новая</Select.Option>
                  <Select.Option value="В работе">В работе</Select.Option>
                  <Select.Option value="Завершено">Завершено</Select.Option>
                </Select>
              )}
            />

            <Controller
              control={control}
              name="atiCode"
              render={({ field }) => (
                <TextInput
                  type="number"
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  label="ATI код"
                  placeholder="Ваш ATI код"
                  errorMessage={errors.atiCode && "Это поле обязательно"}
                  validationState={errors.atiCode ? "invalid" : undefined}
                />
              )}
            />
            <div className="flex justify-end gap-4">
              <Button loading={btnLoading} type="submit" view="action" size="l">
                Добавить
              </Button>
              <Button onClick={onCancel} view="outlined-danger" size="l">
                Отмена
              </Button>
            </div>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
}
