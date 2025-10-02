import React, { useState, useCallback } from 'react';
import { Container, Stack, Typography, Button, Alert, LinearProgress, Paper, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTasks } from '../hooks/useTasks';
import { TasksTable } from './TasksTable';
import { Task } from '../types/AppTypes';
import { TaskFormDialog } from './dialogs/TaskFormDialog';
import { TaskViewDialog } from './dialogs/TaskViewDialog';
import { ConfirmDeleteDialog } from './dialogs/ConfirmDeleteDialog';

export const Dashboard: React.FC = () => {
  const { tasks, loading, error, refresh, createTask, updateTask, deleteTask } = useTasks();

  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);

  const handleCreate = useCallback(async (task: Task) => {
    await createTask(task);
    setCreateOpen(false);
    setSnack('Task created');
  }, [createTask]);

  const handleUpdate = useCallback(async (task: Task) => {
    if (!editTask) return;
    await updateTask(editTask.id, task);
    setEditTask(null);
    setSnack('Task updated');
  }, [editTask, updateTask]);

  const handleDelete = useCallback(async (task: Task) => {
    await deleteTask(task.id);
    setDeleteTarget(null);
    setSnack('Task deleted');
  }, [deleteTask]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="h4" fontWeight={600}>Tasks Dashboard</Typography>
        <Stack direction="row" gap={1}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
            Create Task
          </Button>
          <Button variant="outlined" startIcon={<RefreshIcon />} disabled={loading} onClick={refresh}>
            Refresh
          </Button>
        </Stack>
      </Stack>

      <Paper elevation={1} sx={{ mt: 3, p: 2, position: 'relative' }}>
        {loading && <LinearProgress sx={{ position: 'absolute'}} />}
        <Stack gap={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {!error && !loading && tasks.length === 0 && (
            <Alert severity="info">No tasks found.</Alert>
          )}
          {tasks.length > 0 && (
            <TasksTable
              tasks={tasks}
              onView={(task) => setViewTask(task)}
              onEdit={(task) => setEditTask(task)}
              onDelete={(task) => setDeleteTarget(task)}
            />
          )}
        </Stack>
      </Paper>

      <TaskFormDialog
        open={createOpen}
        mode="create"
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />

      <TaskFormDialog
        open={!!editTask}
        mode="update"
        task={editTask || undefined}
        onClose={() => setEditTask(null)}
        onSubmit={handleUpdate}
      />

      <TaskViewDialog
        open={!!viewTask}
        task={viewTask}
        onClose={() => setViewTask(null)}
      />

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        task={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <Snackbar
        open={!!snack}
        autoHideDuration={2500}
        onClose={() => setSnack(null)}
        message={snack || ''}
      />
    </Container>
  );
};

export default Dashboard;
