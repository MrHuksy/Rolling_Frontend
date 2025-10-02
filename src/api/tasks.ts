import { Task } from '../types/AppTypes';

const BASE_URL = 'https://rd1ng5uol1.execute-api.ap-southeast-2.amazonaws.com';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) {
    throw new Error(`Failed to load tasks (${res.status})`);
  }

  return res.json();
}
