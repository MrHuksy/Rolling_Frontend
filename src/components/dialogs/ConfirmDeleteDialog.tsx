import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack } from '@mui/material';
import { ConfirmDeleteDialogProps } from '../../types/AppTypes';

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, task, onCancel, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <Stack gap={2} mt={1}>
          <Typography>Are you sure you want to delete this task?</Typography>
          {task && (
            <Typography variant="body2" color="text.secondary">{task.id} - {task.title}</Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="error" variant="contained" onClick={() => task && onConfirm(task)}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
