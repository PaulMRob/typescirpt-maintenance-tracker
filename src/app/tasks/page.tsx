'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Task } from 'lib/types/task';

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then(setTasks)
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gym Maintenance Tasks</h1>
      <Link href="/tasks/new" className="text-blue-600 hover:underline">
        + New Task
      </Link>
      <ul className="mt-4 space-y-2">
        {tasks.map(task => (
          <li key={task.taskId}>
            <Link href={`/tasks/${task.taskId}`} className="block p-2 bg-gray-100 hover:bg-gray-200 rounded">
              <strong>{task.title}</strong> — <em>{task.status}</em>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
