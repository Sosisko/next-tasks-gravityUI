import { ITasks } from "@/types/tasks";

const baseUrl = "https://02da6eb2c7e0706e.mokky.dev";


export const getAllTasks = async (): Promise<ITasks[]> => {
    try {
        const response = await fetch(`${baseUrl}/tasks`);
        const tasks = await response.json();
        console.log(tasks);
        return tasks;
    } catch (error) {
        console.error(error);
        return [];
    }
    
}