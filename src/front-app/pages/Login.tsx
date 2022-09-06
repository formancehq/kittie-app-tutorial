import { Box, Container, Input, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { api, setJwt, signOut } from '../lib/api';
import { Button } from './components/Button';
import { PageHead } from './components/PageHead';
// enter phone number
// call get code
// enter code

export const Login = () => {
  const [state, setState] = React.useState({
    phone: '',
    rid: '',
    code: '',
  });

  async function requestCode() {
    const res = await api.post('/auth/request-code', {
      phone_number: state.phone,
    });

    const rid = res.data['rid'];

    setState({
      ...state,
      rid,
    });
  }

  async function login() {
    const res = await api.post('/auth/login', {
      rid: state.rid,
      code: state.code,
    });

    if (res.data.jwt) {
      setJwt(res.data.jwt);
    } else {
      signOut();
    }
  }

  return (
    <>
      <PageHead>Login</PageHead>
      {!state.rid && (
        <Container>
          <Box textAlign="center" pl={2} pr={2}>
            <TextField type="phone" onChange={(e) => setState({
              ...state,
              phone: e.target.value,
            })} label="Phone number" sx={{
              width: '100%',
            }}/>
            <br />
            <Button
              type="submit" onClick={requestCode}
              sx={{
                width: '100%',
                mt: 4,
              }}>Continue</Button>
          </Box>
        </Container>
      )}
      {state.rid && (
         <Container>
           <Box textAlign="center" pl={2} pr={2}>
            <Typography paragraph p={2} mb={4}>Please confirm the verification code we just sent to +33673534853</Typography>
            <TextField type="number" fullWidth onChange={e => setState({
                ...state,
                code: e.target.value,
              })}/>
            <br />
            <Button fullWidth sx={{
              mt: 2,
            }} onClick={login}>Login</Button>
          </Box>
        </Container>
      )}
    </>
  )
}
