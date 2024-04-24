"use client";

import { getAllTasks } from "@/api/api";
import TasksList from "../components/TasksList";
import { useEffect, useState } from "react";
import { ITasks } from "@/types/tasks";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ITasks[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="flex items-center justify-center flex-col mt-6">
        <h1 className="text-2xl font-bold">AdminPanel</h1>
        <TasksList tasks={tasks} router={router} />
      </div>
    </div>
  );
}
