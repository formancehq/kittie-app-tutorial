import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

export const PageHead = (props: any) => {
  return (
    <Box>
      <Typography textAlign="center" variant="h3"
        p={2} mt={10} mb={props.small ? 2 : 10}>{props.children}</Typography>
    </Box>
  );
}