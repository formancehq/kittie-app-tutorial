import { ButtonBase } from '@mui/material';
import * as React from 'react';

export const Button = (props: any) => {
  let sx : {
    [key: string]: any
  } = {};

  const heritedProps = {
    ...props,
  }

  if (props.fullWidth) {
    sx.width = '100%';
    delete heritedProps.fullWidth;
  }

  if (!props.secondary) {
    sx = {
      ...sx,
      background: '#1D2025',
      color: '#fff',
      fontWeight: 'bold',
    };
  } else {
    sx = {
      ...sx,
      borderColor: '#1D2025',
      borderWidth: 2,
      borderStyle: 'solid',
      color: '#1D2025',
      fontWeight: 'bold',
    };
    delete heritedProps.secondary;
  }

  if (props.disabled) {
    sx = {
      ...sx,
      opacity: 0.5,
    };
  }

  return (
    <ButtonBase {...heritedProps} sx={{
      ...props.sx,
      ...sx,
      pl: 4,
      pr: 4,
      pt: 2,
      pb: 2,
      borderRadius: '8px',
      fontSize: '1.2rem',
    }}>{props.children}</ButtonBase>
  );
}