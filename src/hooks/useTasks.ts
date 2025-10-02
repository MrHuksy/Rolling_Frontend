import { useCallback, useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import { Task, ExtendedUseTasksResult } from '../types/AppTypes';

export function useTasks(): ExtendedUseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = useCallback(async (task: Task) => {
    await createTask(task);
    await load();
  }, [load]);

  const handleUpdate = useCallback(async (id: string, patch: Partial<Task>) => {
    await updateTask(id, patch);
    await load();
  }, [load]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteTask(id);
    await load();
  }, [load]);

  return { tasks, loading, error, refresh: load, createTask: handleCreate, updateTask: handleUpdate, deleteTask: handleDelete };
}
