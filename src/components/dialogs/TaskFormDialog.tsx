import React, { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Button, FormControlLabel, Checkbox } from '@mui/material';
import { TaskFormDialogProps, Task } from '../../types/AppTypes';
import { validCreatedDate, validISODate } from '../../utils/date';

const emptyTask = (): Task => ({ id: '', title: '', description: '', created: '', due: '', complete: false });

interface FieldErrors { id?: string; title?: string; description?: string; created?: string; due?: string; }

export const TaskFormDialog: React.FC<TaskFormDialogProps> = ({ open, mode, task, onClose, onSubmit }) => {
  const [form, setForm] = useState<Task>(emptyTask());
  const [errors, setErrors] = useState<FieldErrors>({});
  const isUpdate = mode === 'update';

  useEffect(() => {
    if (open) {
      setForm(task ? { ...task } : emptyTask());
      setErrors({});
    }
  }, [open, task]);

  const validate = useCallback((data: Task): FieldErrors => {
    const e: FieldErrors = {};
    if (!data.id.trim() && !isUpdate) e.id = 'ID is required';
    if (!data.title.trim()) e.title = 'Title is required';
    if (!data.description.trim()) e.description = 'Description is required';
    if (!data.created.trim()) e.created = 'Created date required';
    else if (!validCreatedDate(data.created.trim())) e.created = 'Format DD/MM/YYYY';
    if (!data.due.trim()) e.due = 'Due date required';
    else if (!validISODate(data.due.trim())) e.due = 'Must be ISO date string';
    return e;
  }, [isUpdate]);

  const validateField = useCallback((field: keyof FieldErrors, value: string) => {
    let msg: string | undefined;
    switch (field) {
      case 'id':
        if (!isUpdate && !value.trim()) msg = 'ID is required';
        break;
      case 'title':
        if (!value.trim()) msg = 'Title is required';
        break;
      case 'description':
        if (!value.trim()) msg = 'Description is required';
        break;
      case 'created':
        if (!value.trim()) msg = 'Created date required';
        else if (!validCreatedDate(value.trim())) msg = 'Format DD/MM/YYYY';
        break;
      case 'due':
        if (!value.trim()) msg = 'Due date required';
        else if (!validISODate(value.trim())) msg = 'Must be ISO date';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: msg }));
  }, [isUpdate]);

  const handleChange = (field: keyof Task) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === 'complete' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: value }));
    if (field !== 'complete') {
      const key = field as keyof FieldErrors;
      if (['id','title','description','created','due'].includes(field)) {
        validateField(key, value as string);
      }
    }
  };

  const isSubmittingDisabled = (): boolean => {
    const currentErrors = validate(form);
    return Object.keys(currentErrors).length > 0;
  };

  const handleSubmit = async () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    await onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isUpdate ? 'Update Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <Stack gap={2} mt={1}>
          <TextField label="ID" value={form.id} disabled={isUpdate} onChange={handleChange('id')} fullWidth size="small" error={!!errors.id} helperText={errors.id} />
          <TextField label="Title" value={form.title} onChange={handleChange('title')} fullWidth size="small" error={!!errors.title} helperText={errors.title} />
          <TextField label="Description" value={form.description} onChange={handleChange('description')} fullWidth multiline minRows={3} size="small" error={!!errors.description} helperText={errors.description} />
          <TextField label="Created (DD/MM/YYYY)" value={form.created} onChange={handleChange('created')} fullWidth size="small" error={!!errors.created} helperText={errors.created} />
          <TextField label="Due (ISO)" value={form.due} onChange={handleChange('due')} fullWidth size="small" error={!!errors.due} helperText={errors.due} />
          <FormControlLabel control={<Checkbox checked={form.complete} onChange={handleChange('complete')} />} label="Complete" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={isSubmittingDisabled()}>{isUpdate ? 'Save' : 'Create'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormDialog;
