"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "@mona-health/react-input-mask";
import { Select, TextArea, TextInput, ThemeProvider } from "@gravity-ui/uikit";
import React from "react";

const formSchema = z.object({
  name: z.string().min(1, "Это поле обязательно"),
  secondname: z.string().min(1, "Это поле обязательно"),
  surname: z.string().min(1, "Это поле обязательно"),
  company: z.string().min(1, "Это поле обязательно"),
  phone: z.string().min(1, "Это поле обязательно"),
  comment: z.string().optional(),
  status: z.enum(["Новая", "В работе", "Завершено"]),
  atiCode: z.number().min(1, "Это поле обязательно"),
});

export default function Test() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
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
    reset();
  };

  return (
    <div className="container">
      <div className="max-w-2xl">
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
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputMask {...field} mask="+7(999)999-99-99">
                  <TextInput
                    {...field}
                    label="Телефон"
                    placeholder="Ваш телефон"
                    value={field.value}
                    onChange={field.onChange}
                    type="tel"
                    errorMessage={
                      errors.phone && "Поле обязательно для заполнения"
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
              {...register("atiCode", { valueAsNumber: true })}
              label="ATI код"
              placeholder="Ваш ATI код"
              errorMessage={errors.atiCode && "Введите ваш ATI код"}
              validationState={errors.atiCode ? "invalid" : undefined}
            />
            <button type="submit">ОК</button>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
}
