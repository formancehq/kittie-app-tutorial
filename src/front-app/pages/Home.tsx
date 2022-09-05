import { Container } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HelloWorld } from './components/HelloWorld';

export const Home = () => {
  return (
    <>
      <Navbar></Navbar>
      <Container sx={{
        marginTop: 2,
      }}>
      <HelloWorld></HelloWorld>
      </Container>
      {/* <History></History> */}
    </>
  )
}