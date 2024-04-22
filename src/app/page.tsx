

import { getAllTasks } from "@/api/api";

import MyTable from "./MyTable";

export default async function Home() {
  const tasks = await getAllTasks();
  console.log(tasks);


  return (
    <div className="container">
      <MyTable tasks={tasks}/>
    </div>
    
  );
}
