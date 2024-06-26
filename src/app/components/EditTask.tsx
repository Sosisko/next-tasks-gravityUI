"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Modal,
  Select,
  TextArea,
  TextInput,
  ThemeProvider,
} from "@gravity-ui/uikit";

import { ITasks } from "@/types/tasks";
import { updateTask } from "@/api/api";
import { Controller, useForm } from "react-hook-form";
import InputMask from "@mona-health/react-input-mask";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const formSchema = yup.object({
  name: yup.string().required("Это поле обязательно").trim(),
  secondname: yup.string().required("Это поле обязательно").trim(),
  surname: yup.string().required("Это поле обязательно").trim(),
  company: yup.string().required("Это поле обязательно").trim(),
  phone: yup.string().min(16),
  comment: yup.string().optional(),
  status: yup.string().optional(),
  atiCode: yup.number().positive().integer().required().min(4),
});

interface EditTaskProps {
  isModalOpen: boolean;
  handleEditTask: (task: ITasks) => void;
  handleCancel: () => void;
  task: ITasks;
}

export default function EditTask({
  isModalOpen,
  handleEditTask,
  handleCancel,
  task,
}: EditTaskProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (isModalOpen) {
      reset();
      setValue("phone", task.phone);
      setValue("status", task.status);
      setValue("atiCode", task.atiCode);
      // reset({ phone: task.phone});
      // reset({ status: task.status });
    }
  }, [isModalOpen, task.phone, task.status, task.atiCode, task]);

  const onSubmit = (values: any) => {
    const capitFirstLet = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);
    const newValues = {
      ...values,
      name: capitFirstLet(values.name.trim()),
      secondname: capitFirstLet(values.secondname.trim()),
      surname: capitFirstLet(values.surname.trim()),
      company: values.company.trim(),
      id: task.id,
      date: new Date(Date.now()).toLocaleString("ru-RU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    handleEditTask(newValues);
    updateTask(newValues);
    router.refresh();
  };


  return (
    <Modal open={isModalOpen} onClose={handleCancel}>
      <div className="container">
        <div className="max-w-2xl pt-8 pb-8">
          <ThemeProvider theme="light">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextInput
                {...register("name")}
                defaultValue={task.name}
                label="Имя"
                placeholder="Ваше имя"
                errorMessage={errors.name && "Поле обязательно для заполнения"}
                validationState={errors.name ? "invalid" : undefined}
              />

              <TextInput
                {...register("secondname")}
                defaultValue={task.secondname}
                label="Фамилия"
                placeholder="Ваша фамилия"
                errorMessage={
                  errors.secondname && "Поле обязательно для заполнения"
                }
                validationState={errors.secondname ? "invalid" : undefined}
              />

              <TextInput
                {...register("surname")}
                defaultValue={task.surname}
                label="Отчество"
                placeholder="Ваше отчество"
                errorMessage={
                  errors.surname && "Поле обязательно для заполнения"
                }
                validationState={errors.surname ? "invalid" : undefined}
              />
              <TextInput
                {...register("company")}
                defaultValue={task.company}
                label="Компания"
                placeholder="Ваша компания"
                errorMessage={
                  errors.company && "Поле обязательно для заполнения"
                }
                validationState={errors.company ? "invalid" : undefined}
              />

              <Controller
                control={control}
                name="phone"
                defaultValue={task.phone}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    mask="+7(999)999-99-99"
                    placeholder="+7(___)___-__-__"
                    onChange={field.onChange}
                    maskPlaceholder={null}
                  >
                    <TextInput
                      label="Телефон"
                      placeholder="Ваш телефон"
                      value={field.value}
                      errorMessage={
                        errors.phone &&
                        "Это поле обязательно и должно содержать минимум 10 цифр"
                      }
                      validationState={errors.phone ? "invalid" : undefined}
                    />
                  </InputMask>
                )}
              />

              <TextArea
                {...register("comment")}
                placeholder="Комментарий"
                defaultValue={task.comment}
              />

              <Controller
                name="status"
                control={control}
                defaultValue={task.status}
                render={({ field: { onChange, value } }) => (
                  <Select
                    label="Статус"
                    defaultValue={[task.status]}
                    value={[value] as any}
                    onUpdate={(value) => {
                      onChange(value[0]);

                    }}
                  >
                    <Select.Option value="new">Новая</Select.Option>
                    <Select.Option value="inWork">В работе</Select.Option>
                    <Select.Option value="done">Завершено</Select.Option>
                  </Select>
                )}
              />

              <Controller
                control={control}
                name="atiCode"
                defaultValue={task.atiCode as any}
                render={({ field }) => (
                  <TextInput
                    type="number"
                    defaultValue={task.atiCode as any}
                    onChange={field.onChange}
                    label="ATI код"
                    placeholder="Ваш ATI код"
                    errorMessage={errors.atiCode && "Это поле обязательно"}
                    validationState={errors.atiCode ? "invalid" : undefined}
                  />
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  view="action"
                  size="l"
                >
                  Сохранить
                </Button>
                <Button onClick={handleCancel} view="outlined-danger" size="l">
                  Отмена
                </Button>
              </div>
            </form>
          </ThemeProvider>
        </div>
      </div>
    </Modal>
  );
}
