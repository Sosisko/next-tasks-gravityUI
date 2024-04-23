"use client";
import { getAllTasks } from "@/api/api";
import WatchTable from "./WatchTable";
import { useEffect, useState } from "react";
import { ITasks } from "@/types/tasks";

export default function Home() {
  const [tasks, setTasks] = useState<ITasks[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await getAllTasks();
      setTasks(fetchedTasks);
    };

    fetchData();
  }, []);
  console.log(tasks);
  return (
    <div className="container">
      <WatchTable tasks={tasks} />
    </div>
  );
}
