"use client";

import { useState } from "react";
import { Task } from "lib/types/task";
import { Status } from "lib/types/task";

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
  submitLabel = "Save",
  showDelete = false,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [status, setStatus] = useState(initialData.status || "pending");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, status });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-amber-200 border border-black max-w-lg mx-auto p-6 rounded-2xl shadow-md space-y-6"
      aria-label="Task form"
    >
      <h2 className="text-2xl font-semibold text-slate-700">
        {submitLabel} Task
      </h2>

      <label className="block">
        <span className="text-slate-700 font-medium mb-1 block">Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </label>

      <label className="block">
        <span className="text-slate-700 font-medium mb-1 block">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          rows={4}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </label>

      <label className="block">
        <span className="text-slate-700 font-medium mb-1 block">Status</span>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 transition"
        >
          {submitLabel}
        </button>
        {showDelete && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl py-3 transition"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
