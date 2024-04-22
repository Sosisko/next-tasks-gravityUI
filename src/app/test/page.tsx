"use client";
import { InputMask } from "@react-input/mask";

export default function App() {
  return (
    <InputMask
      placeholder="+7 (___) ___-__-__"
      mask="+7 (___) ___-__-__"
      replacement={{ _: /\d/ }}
    />
  );
}
