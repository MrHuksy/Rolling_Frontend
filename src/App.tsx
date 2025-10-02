import React from 'react';
import { CssBaseline, Container, Stack, Typography, Button, Alert, LinearProgress, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTasks } from './hooks/useTasks';
import { TasksTable } from './components/TasksTable';

export const App: React.FC = () => {
  const { tasks, loading, error, refresh } = useTasks();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Typography variant="h4" fontWeight={600}>Tasks Dashboard</Typography>
          <Stack direction="row" gap={1}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => alert('Create Task')}>
              Create Task
            </Button>
            <Button variant="outlined" startIcon={<RefreshIcon />} disabled={loading} onClick={refresh}>
              Refresh
            </Button>
          </Stack>
        </Stack>

        <Paper elevation={1} sx={{ mt: 3, p: 2, position: 'relative' }}>
          {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />}
          <Stack gap={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {!error && !loading && tasks.length === 0 && (
              <Alert severity="info">No tasks found.</Alert>
            )}
            {tasks.length > 0 && (
              <TasksTable tasks={tasks} onEdit={(task) => alert(`Edit ${task.id}`)} onDelete={(task) => alert(`Delete ${task.id}`)} />
            )}
          </Stack>
        </Paper>
      </Container>
    </>
  );
};
