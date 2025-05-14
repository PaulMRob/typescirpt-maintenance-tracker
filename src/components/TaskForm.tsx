'use client';

import { useState } from 'react';
import { Task } from 'lib/types/task';
import { Status } from 'lib/types/task';


type TaskFormProps = {
  initialData?: Partial<Task>;
  onSubmit: (data: { title: string; description: string; status: string }) => void;
  onDelete?: () => void;
  submitLabel?: string;
  showDelete?: boolean;
};

export default function TaskForm({
  initialData = {},
  onSubmit,
  onDelete,
  submitLabel = 'Save',
  showDelete = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [status, setStatus] = useState(initialData.status || 'pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full border p-2"
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value as Status)}
        className="w-full border p-2"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {submitLabel}
        </button>
        {showDelete && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
