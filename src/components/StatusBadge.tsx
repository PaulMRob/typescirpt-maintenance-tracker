type Status = 'pending' | 'in-progress' | 'done';

export function StatusBadge({ status }: { status: Status }) {
  const colorMap: Record<Status, string> = {
    pending: 'bg-yellow-200 text-yellow-800',
    'in-progress': 'bg-blue-200 text-blue-800',
    done: 'bg-green-200 text-green-800',
  };

  console.log(status);
  
  return (
    <span className={`text-sm px-2 py-1 rounded ${colorMap[status]}`}>
      {status}
    </span>
  );
}
