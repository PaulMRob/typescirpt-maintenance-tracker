'use client';

import { useRouter } from 'next/navigation';
import TaskForm from 'src/components/TaskForm';

export default function NewTaskPage() {
  const router = useRouter();

  const handleCreate = async (data: { title: string; description: string; status: string }) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    router.push('/tasks');
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">New Task</h1>
      <TaskForm onSubmit={handleCreate} submitLabel="Create Task" />
    </main>
  );
}
