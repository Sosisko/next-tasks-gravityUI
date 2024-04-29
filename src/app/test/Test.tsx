"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputMask from "@mona-health/react-input-mask";
import { Select, TextArea, TextInput, ThemeProvider } from "@gravity-ui/uikit";
import React from "react";
import { addTask } from "@/api/api";

const formSchema = yup.object({
  name: yup.string().required("Это поле обязательно"),

  secondname: yup.string().required("Это поле обязательно"),
  surname: yup.string().required("Это поле обязательно"),
  company: yup.string().required("Это поле обязательно"),
  phone: yup.string().min(16),
  comment: yup.string().optional(),
  status: yup.string().optional(),

  atiCode: yup
    .number()
    .positive()
    .integer()
    .required()
    .min(6, "Это поле обязательно и должно содержать минимум 6 цифр"),
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

  const onSubmit: SubmitHandler<any> = (data: IFormData) => {
    const newTask = addTask({
      ...data,
      
    })
    onAddtask(newTask);
    console.log(data);
    onCancel();
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
            <p>{errors?.name?.message}</p>

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
                  errorMessage={
                    errors.atiCode &&
                    "Это поле обязательно и должно содержать минимум 6 цифр"
                  }
                  validationState={errors.atiCode ? "invalid" : undefined}
                />
              )}
            />
            <button type="submit">ОК</button>
          </form>
        </ThemeProvider>
      </div>
    </div>
  );
}

// import React from "react";
// import { z, ZodType } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   age: number;
//   password: string;
//   confirmPassword: string;
// };

// function Test() {
//   const schema: ZodType<FormData> = z
//     .object({
//       firstName: z.string().min(2).max(30),
//       lastName: z.string().min(2).max(30),
//       email: z.string().email(),
//       age: z.number().min(18).max(70),
//       password: z.string().min(5).max(20),
//       confirmPassword: z.string().min(5).max(20),
//     })
//     .refine((data) => data.password === data.confirmPassword, {
//       message: "Passwords do not match",
//       path: ["confirmPassword"],
//     });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const submitData = (data: FormData) => {
//     console.log("IT WORKED", data);
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(submitData)}>
//         <label> First Name: </label>
//         <input type="text" {...register("firstName")} />
//         {errors.firstName && <span> {errors.firstName.message}</span>}
//         <label> Last Name: </label>
//         <input type="text" {...register("lastName")} />
//         {errors.lastName && <span> {errors.lastName.message}</span>}
//         <label> Email: </label>
//         <input type="email" {...register("email")} />
//         {errors.email && <span> {errors.email.message}</span>}
//         <label> Age </label>
//         <input type="number" {...register("age", { valueAsNumber: true })} />
//         {errors.age && <span> {errors.age.message}</span>}
//         <label> Password: </label>
//         <input type="password" {...register("password")} />
//         {errors.password && <span> {errors.password.message}</span>}
//         <label> Confirm Password: </label>
//         <input type="password" {...register("confirmPassword")} />
//         {errors.confirmPassword && (
//           <span> {errors.confirmPassword.message}</span>
//         )}

//         <input type="submit" />
//       </form>
//     </div>
//   );
// }

// export default Test;
