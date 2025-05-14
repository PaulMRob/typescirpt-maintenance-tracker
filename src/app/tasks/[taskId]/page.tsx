'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Task } from 'lib/types/task';
import TaskForm from 'src/components/TaskForm';

export default function EditTaskPage() {
  const { taskId } = useParams();
  const router = useRouter();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    fetch(`/api/tasks/${taskId}`)
      .then(res => res.json())
      .then(data => {
        setTask(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load task:', err);
        setLoading(false);
      });
  }, [taskId]);

  const handleUpdate = async (data: { title: string; description: string; status: string }) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    router.push('/tasks');
  };

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
    router.push('/tasks');
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!task) return <p className="p-6">Task not found</p>;

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Task</h1>
      <TaskForm
        initialData={task}
        onSubmit={handleUpdate}
        onDelete={handleDelete}
        submitLabel="Update Task"
        showDelete
      />
    </main>
  );
}
