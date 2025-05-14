'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Task } from 'lib/types/task';
import { StatusBadge } from 'src/components/StatusBadge';

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => {
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        return res.json();
    })
      .then(data => {
        setTasks(data);
        console.log('Fedtched tasks:', data);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        setTasks(prev => prev.filter(task => task.taskId !== taskId));
    } else {
        alert('Failed to delete task');
    }
  };

  return (
    <main className="p-6">
        <div className="bg-blue-500 text-white p-4">
            Tailwind is working!
        </div>
      <h1 className="text-2xl font-bold mb-4">Gym Maintenance Tasks</h1>
      <Link href="/tasks/new" className="text-blue-600 hover:underline">
        + New Task
      </Link>

      {loading ? (
        <p className="mt-4">Loading tasks...</p>
      ) : (
        <ul className="mt-4 space-y-2">
            {tasks.map(task => (
                <li
                    key={task.taskId}
                    className="flex jusftify-between items-center bg-gray-100 p-3 rounded hover:bg-gray-200"
                >
                    <Link href={`/tasks/${task.taskId}`} className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <strong>{task.title}</strong>
                        <StatusBadge status={task.status} />
                    </div>
                    </Link>
                    <button 
                        onClick={() => handleDelete(task.taskId)}
                        className="ml-4 test-red-600 hover:underline text-sm"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul>
      )}
    </main>
  );
}
