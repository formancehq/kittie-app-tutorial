import { Box, Button, Container } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Balance } from './components/Balance';
import { Navbar } from './components/Navbar';
// Load material design icons
import IconSend from '@mui/icons-material/Send';
import IconBalance from '@mui/icons-material/AccountBalanceWallet';
import IconReceive from '@mui/icons-material/RequestQuote';
import IconBank from '@mui/icons-material/AccountBalance';
import { signedIn } from '../lib/api.ts'


// Helper to load and display icons
const ActionIcon = ({path, text, icon} : {
  icon?: any,
  path: string,
  text: string,
}) => (
  <Link to={path}>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1,
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#f5f5f5',
        opacity: 0.8,
      }}>
        {icon}
      </Box>
      <Box>
        <span>{text}</span>
      </Box>
    </Box>
  </Link>
);

// What to display when not logged in
const LoggedOut = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container sx={{
        marginTop: 2,
      }}>
        <Box textAlign="center" pl={2} pr={2}>
          You're not logged in. Let's fix that!
        </Box>
        <Box textAlign="center" pl={2} pr={2}>
          <Button component={Link} to="/login">Login</Button>
        </Box>
      </Container>
    </>
  );
};


// What to display when logged in
const LoggedIn = () => {
  return (
<>
      <Navbar></Navbar>
      <Container sx={{
        marginTop: 2,
      }}>
        <Balance></Balance>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          pt: 3,
        }}>
      {/* future action icons here */}
        </Box>
      </Container>
    </>
  )  
};

export const Home = () => {
  return signedIn() ? <LoggedIn /> : <LoggedOut />
}