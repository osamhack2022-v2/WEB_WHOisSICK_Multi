import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';

export default function Variants() {
  return (
    <Container component="main" maxwidth="xs">
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            '& > :not(style)': {
            m: 0,
            width: 128,
            height: 128,
            },
        }}
        >
        <Paper variant="outlined" square />
        <Paper variant="outlined" square />
        </Box>
    </Container>
  );
}