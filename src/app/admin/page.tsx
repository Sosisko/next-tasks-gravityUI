"use client";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { getAllTasks } from "@/api/api";
import TasksList from "../components/TasksList";
import { useEffect, useState } from "react";
import { ITasks } from "@/types/tasks";
import { useRouter } from "next/navigation";
import { Loader, ThemeProvider } from "@gravity-ui/uikit";

export default function AdminPanel() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTasks = await getAllTasks();
        setTasks(fetchedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="flex items-center justify-center flex-col mt-6">
        <h1 className="text-2xl font-bold">AdminPanel</h1>

        {isLoading ? (
          <ThemeProvider theme="light">
            <Loader size="l" />
          </ThemeProvider>
        ) : (
          <TasksList tasks={tasks} router={router} />
        )}
      </div>
    </div>
  );
}
