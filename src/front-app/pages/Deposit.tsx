import { Box, Container, Input, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { api } from '../lib/api';
import { Button } from './components/Button';
import { Navbar } from './components/Navbar';
import { PageHead } from './components/PageHead';

export const Deposit = () => {
  const [amount, setAmount] = React.useState(0);

  async function checkout() {
    const res = await api.post('/wallets/deposit/link', {
      amount: {
        amount: amount * 100,
        asset: 'EUR/2',
      },
      redirect: {
        success: `${window.location.origin}`,
        fallback: `${window.location.origin}`,
      },
    });

    if (!res.data.url) {
      return;
    }

    window.open(res.data.url, '_blank');
  }

  return (
    <>
      <Navbar></Navbar>
      <PageHead>Deposit</PageHead>
      <Container>
        <Box textAlign="center" pl={2} pr={2}>
          <div>
            <TextField type="text" placeholder="Amount"
              onChange={(e) => setAmount(parseInt(e.target.value))}
              InputProps={{
                endAdornment: (
                  <Box sx={{
                    ml: 1,
                    fontWeight: 'medium',
                    opacity: 0.5,
                  }}>EUR</Box>
                ),
              }}
              sx={{
                mb: 2,
              }} fullWidth/>
          </div>
          <div>
            <Button type="submit" onClick={checkout} fullWidth>Go to payment</Button>
          </div>
        </Box>
      </Container>
    </>
  )
}
