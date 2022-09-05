import * as React from 'react';
import { api } from '../../lib/api';

export const HelloWorld = () => {
  const [text, setText] = React.useState("loading…");

  React.useEffect(() => {
    (async () => {
      const res = await api.get('/');

      if (res.status !== 200) {
        setText(res.data);
      }

      setText(res.data);
    })();
  }, []);

  return (
    <div>{text}</div>
  );
}