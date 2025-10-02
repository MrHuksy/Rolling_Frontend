import axios from 'axios';
import { Task } from '../types/AppTypes';

const BASE_URL = 'https://rd1ng5uol1.execute-api.ap-southeast-2.amazonaws.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Accept': 'application/json' }
});

function extractError(error: any) {
  if (error.response) {
    // extract out the error message from response
    const data = error.response.data;
    if (data && typeof data === 'object') {
      if (typeof data.message === 'string') return data.message;
      if (Array.isArray(data.message)) return data.message.join(', ');
    }
    return `(${error.response.status})`;
  }
  return error.message;
}

export async function fetchTasks(): Promise<Task[]> {
  try {
    const res = await api.get<Task[]>('/tasks');
    return res.data || [];
  } catch (e: any) {
    throw new Error(extractError(e));
  }
}

export async function fetchTask(id: string): Promise<Task | null> {
  try {
    const res = await api.get<Task>(`/tasks/${id}`);
    return res.data || null;
  } catch (e: any) {
    throw new Error(extractError(e));
  }
}

export async function createTask(task: Task): Promise<Task> {
  try {
    const res = await api.post<Task>('/tasks', task, { headers: { 'Content-Type': 'application/json' } });
    return res.data;
  } catch (e: any) {
    throw new Error(extractError(e));
  }
}

export async function updateTask(id: string, patch: Partial<Task>): Promise<Task> {
  try {
    const res = await api.patch<Task>(`/tasks/${id}`, patch, { headers: { 'Content-Type': 'application/json' } });
    return res.data;
  } catch (e: any) {
    throw new Error(extractError(e));
  }
}

export async function deleteTask(id: string): Promise<void> {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (e: any) {
    throw new Error(extractError(e));
  }
}
