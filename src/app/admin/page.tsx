import { getAllTasks } from "@/api/api";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";

export default async function AdminPanel() {
  const tasks = await getAllTasks();

  return (
    <div className="container">
      <div className="flex items-center justify-center flex-col mt-6">
        <h1 className="text-2xl font-bold">AdminPanel</h1>
        <AddTask />
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
}
