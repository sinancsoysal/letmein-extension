import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getTheme } from './components/Util';
import Home from './components/Home';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>(getTheme(prefersDarkMode));
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Home colorModeContext={ColorModeContext} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}