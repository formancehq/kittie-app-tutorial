import { Avatar, Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import QrCode from '@mui/icons-material/QrCode';

export const Navbar = () => {
  const showQrCode = () => {
    window.location.href = '/code';
  };

  return (
    <>
      <Container>
        <Box sx={{
          display: 'flex',
        }} pt={2} alignItems="center">
          <div>
            <Link to="/">
              <Typography fontSize={22} fontFamily="Josefin Sans">kittie</Typography>
            </Link>
          </div>
          <Box ml={'auto'} display="flex" gap={2} alignItems="center">
            <Link to="/">
              <Avatar sx={{
                width: '32px',
                height: '32px',
                fontSize: '16px',
              }}>CS</Avatar>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}