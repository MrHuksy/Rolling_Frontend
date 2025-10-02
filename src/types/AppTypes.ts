export interface Task {
  id: string;
  title: string;
  description: string;
  created: string; // DD/MM/YYYY
  due: string; // ISO date string
  complete: boolean;
}

export interface UseTasksResult {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export interface TasksTableProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

export interface TasksTableRowProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}
