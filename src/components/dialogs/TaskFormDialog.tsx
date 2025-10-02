import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Button, FormControlLabel, Checkbox } from '@mui/material';
import { TaskFormDialogProps, Task } from '../../types/AppTypes';

const emptyTask = (): Task => ({ id: '', title: '', description: '', created: '', due: '', complete: false });

export const TaskFormDialog: React.FC<TaskFormDialogProps> = ({ open, mode, task, onClose, onSubmit }) => {
  const [form, setForm] = useState<Task>(emptyTask());
  const isUpdate = mode === 'update';

  useEffect(() => {
    if (open) {
      setForm(task ? { ...task } : emptyTask());
    }
  }, [open, task]);

  const handleChange = (field: keyof Task) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'complete' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isUpdate ? 'Update Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <Stack gap={2} mt={1}>
          <TextField label="ID" value={form.id} disabled={isUpdate} onChange={handleChange('id')} fullWidth size="small" />
          <TextField label="Title" value={form.title} onChange={handleChange('title')} fullWidth size="small" />
            <TextField label="Description" value={form.description} onChange={handleChange('description')} fullWidth multiline minRows={3} size="small" />
          <TextField label="Created (DD/MM/YYYY)" value={form.created} onChange={handleChange('created')} fullWidth size="small" />
          <TextField label="Due (ISO)" value={form.due} onChange={handleChange('due')} fullWidth size="small" />
          <FormControlLabel control={<Checkbox checked={form.complete} onChange={handleChange('complete')} />} label="Complete" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{isUpdate ? 'Save' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormDialog;
