import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { api } from '../../lib/api';

export const Balance = () => {
  const initial : {[k: string]: number} = {};
  const [balances, setBalances] = React.useState(initial);

  React.useEffect(() => {
    (async () => {
      const res = await api.get('/wallets/balance');

      if (res.status !== 200) {
        return;
      }

      setBalances(res.data);
    })();
  }, []);

  return (
    <>
      <Box sx={{
        background: '#111',
        color: '#F5F5F5',
        borderRadius: '8px',
      }} pl={3} pr={3} pt={2} pb={2}>
        <Typography
          mt={1} mb={1}
          fontSize={18} color={'#5D6779'}
          fontWeight={'bold'}
          >Main balance</Typography>
        {balances && Object.keys(balances).map(asset => (
          <Box key={asset} sx={{
            display: 'flex',
            alignItems: 'center',
            // flexDirection: 'row-reverse',
            gap: 1,
          }}>
            <Typography fontSize={32} fontWeight="bold" sx={{
              display: 'flex',
            }}>{`${asset.split('/')[0]}`}</Typography>
            <Typography fontSize={32} fontWeight="bold" sx={{
              display: 'flex',
            }}>
              {`${
                (balances[asset] / 100).toLocaleString('en-US', {minimumFractionDigits: 2})
              }`}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  )
}