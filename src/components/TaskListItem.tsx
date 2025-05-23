import { Task } from "lib/types/task";
import { StatusBadge } from "./StatusBadge";

const statusColors = {
    pending: 'bg-yellow-200 text-yellow-800',
    'in-progress': 'bg-blue-200 text-blue-800',
    done: 'bg-green-200 text-green-800',
  };
  
  export default function TaskListItem({ task }: { task: Task }) {
    return (
      <li>
        <a 
          href={`/tasks/${task.taskId}`} 
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded flex justify-between items-center"
        >
          <span>{task.title}</span>
          <StatusBadge status={task.status} />
        </a>
      </li>
    );
  }
  