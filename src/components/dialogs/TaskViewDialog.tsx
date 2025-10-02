import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography, Chip } from '@mui/material';
import { TaskViewDialogProps } from '../../types/AppTypes';
import { formatDue } from '../../utils/date';

export const TaskViewDialog: React.FC<TaskViewDialogProps> = ({ open, task, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent dividers>
        {task && (
          <Stack gap={1}>
            <Typography variant="subtitle2" color="text.secondary">ID</Typography>
            <Typography>{task.id}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Title</Typography>
            <Typography>{task.title}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Description</Typography>
            <Typography whiteSpace="pre-line">{task.description}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Created</Typography>
            <Typography>{task.created}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Due</Typography>
            <Typography>{formatDue(task.due)}</Typography>
            <Typography variant="subtitle2" color="text.secondary">Complete</Typography>
            <Chip size="small" label={task.complete ? 'Yes' : 'No'} color={task.complete ? 'success' : 'warning'} />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskViewDialog;
