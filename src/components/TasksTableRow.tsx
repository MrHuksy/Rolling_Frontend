import React from 'react';
import { TableRow, TableCell, Chip, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TasksTableRowProps } from '../types/AppTypes';
import { formatDue } from '../utils/date';

export const TasksTableRow: React.FC<TasksTableRowProps> = ({ task, onEdit, onDelete }) => {
  return (
    <TableRow hover>
      <TableCell sx={{ fontFamily: 'mono', fontSize: '0.7rem' }}>{task.id}</TableCell>
      <TableCell>{task.title}</TableCell>
      <TableCell sx={{ maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.description}</TableCell>
      <TableCell>{task.created}</TableCell>
      <TableCell>{formatDue(task.due)}</TableCell>
      <TableCell>
        <Chip
          label={task.complete ? 'Yes' : 'No'}
          size="small"
          color={task.complete ? 'success' : 'warning'}
          variant={task.complete ? 'filled' : 'outlined'}
        />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Edit"><span>
          <IconButton size="small" onClick={() => onEdit?.(task)} disabled={!onEdit}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </span></Tooltip>
        <Tooltip title="Delete"><span>
          <IconButton size="small" color="error" onClick={() => onDelete?.(task)} disabled={!onDelete}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </span></Tooltip>
      </TableCell>
    </TableRow>
  );
};
