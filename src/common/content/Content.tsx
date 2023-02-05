import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface ContentProps {
  children: ReactNode
}

const Content = ({ children }: ContentProps): JSX.Element => <Box m={1}>{children}</Box>;

export default Content;
