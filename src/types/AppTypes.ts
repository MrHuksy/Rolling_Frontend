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

export interface ExtendedUseTasksResult extends UseTasksResult {
  createTask: (task: Task) => Promise<void>;
  updateTask: (id: string, patch: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export interface TasksTableProps {
  tasks: Task[];
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onView?: (task: Task) => void;
}

export interface TasksTableRowProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
  onView?: (task: Task) => void;
}

export interface TaskFormDialogProps {
  open: boolean;
  mode: 'create' | 'update';
  task?: Task;
  onClose: () => void;
  onSubmit: (data: Task) => Promise<void> | void;
}

export interface TaskViewDialogProps {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
}

export interface ConfirmDeleteDialogProps {
  open: boolean;
  task?: Task | null;
  onCancel: () => void;
  onConfirm: (task: Task) => Promise<void> | void;
}
