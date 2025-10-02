import React from 'react';
import { CssBaseline } from '@mui/material';
import { Dashboard } from './components/Dashboard';

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Dashboard />
    </>
  );
};
