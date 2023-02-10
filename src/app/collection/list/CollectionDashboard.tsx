import React, { useEffect } from 'react';
import { Tooltip, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import gsap from 'gsap';

interface CollectionDashboardProps {
  onItem: boolean
}

const CollectionDashboard = ({ onItem }: CollectionDashboardProps) => {
  useEffect(() => {
    if (onItem) {
      gsap.fromTo(
        '.dashboard',
        { left: -105, duration: 0.5, ease: 'power1.inOut' },
        { left: 15, duration: 0.5, ease: 'power1.inOut' },
      );
    } else {
      gsap.fromTo(
        '.dashboard',
        { left: 15, duration: 0.5, ease: 'power1.inOut' },
        { left: -105, duration: 0.5, ease: 'power1.inOut' },
      );
    }
  }, [onItem]);

  return (
    <Paper
      className="dashboard"
      elevation={5}
      sx={{
        position: 'absolute',
        top: 140,
        left: -45,
        backgroundColor: '#3ad2ff8d',

      }}
    >
      <Box sx={{
        width: 100,
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <Tooltip title="Delete">
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton color="warning">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default CollectionDashboard;
