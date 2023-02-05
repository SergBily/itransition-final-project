import React from 'react';
import { Box } from '@mui/material';

interface ErrorsProps {
  message: string | undefined,
  position: string
}

const Errors = ({ message, position }:ErrorsProps): JSX.Element => (
  <Box sx={{
    position: 'absolute',
    fontSize: '14px',
    bottom: position,
    left: '5px',
    color: 'red',
    mt: 1,
    mb: 1,
    height: '38px',
  }}
  >
    {message}
  </Box>
);

export default Errors;
