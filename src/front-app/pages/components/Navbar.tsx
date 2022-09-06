import { Avatar, Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import QrCode from '@mui/icons-material/QrCode';
import IconFriends from '@mui/icons-material/Contacts';

export const Navbar = () => {
  return (
    <>
      <Container>
        <Box sx={{
          display: 'flex',
        }} pt={2} alignItems="center">
          <div>
            <Link to="/">
              <Typography fontSize={22} fontWeight="bold">Kittie</Typography>
            </Link>
          </div>
          <Box sx={{
              ml: 'auto',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2,
              'a': {
                display: 'flex',
              }
            }}>
          </Box>
        </Box>
      </Container>
    </>
  );
}