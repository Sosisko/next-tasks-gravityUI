import { getAllTasks } from "@/api/api";

import WatchTable from "./WatchTable";

export default async function Home() {
  const tasks = await getAllTasks();
  console.log(tasks);

  return (
    <div className="container">
      <WatchTable tasks={tasks} />
    </div>
  );
}
