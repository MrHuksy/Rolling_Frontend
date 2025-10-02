import { Task } from '../types/AppTypes';

const BASE_URL = 'https://rd1ng5uol1.execute-api.ap-southeast-2.amazonaws.com';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) {
    throw new Error(`Failed to load tasks (${res.status})`);
  }

  return res.json();
}

export async function fetchTask(id: string): Promise<Task | null> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) {
    throw new Error(`Failed to load task (${res.status})`);
  }
  try { return await res.json(); } catch { return null; }
}

export async function createTask(task: Task): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(task)
  });
  if (!res.ok) {
    throw new Error(`Failed to create task (${res.status})`);
  }
  return res.json();
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(patch)
  });
  if (!res.ok) {
    throw new Error(`Failed to update task (${res.status})`);
  }
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`Failed to delete task (${res.status})`);
  }
}
