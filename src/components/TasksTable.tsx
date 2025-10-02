import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TasksTableRow } from './TasksTableRow';
import { TasksTableProps } from '../types/AppTypes';

export const TasksTable: React.FC<TasksTableProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <TableContainer sx={{ maxHeight: 520 }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Due</TableCell>
            <TableCell>Complete</TableCell>
            <TableCell align="right" sx={{ width: 120 }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(t => (
            <TasksTableRow key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
