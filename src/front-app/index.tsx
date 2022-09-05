import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Home } from './pages/Home';
import './global.css';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
  }
});

const App = () => {
  return (
    <>
      <CssBaseline></CssBaseline>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

const AppLoader = () => {
  return (
      <App></App>
  );
}

(() => {
  const container = document.querySelector('#app');
  
  if (!container) {
    return
  }

  const root = createRoot(container);
  root.render(React.createElement(AppLoader));
})();