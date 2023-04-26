import React, { useEffect, useState } from 'react';
import whiteLogo from './logo/white.svg';
import blackLogo from './logo/black.svg';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from '@mui/icons-material/Settings'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import './App.css';
import { Container, Stack, maxWidth, minHeight } from '@mui/system';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // const [account, setAccount] = React.useState(''); 
  // const handleChange = (event: SelectChangeEvent) => {
  //   setAccount(event.target.value);
  // };

  useEffect(() => {
    // Get the current URL of the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const url = new URL(activeTab.url || "");
      const domain = url.hostname;
      setCurrentUrl(domain || "couldn't parse url");
    });
  }, []);

  return (
    <>
      <Stack
        sx={{
          justifyContent: 'space-between',
          bgcolor: 'background.default',
          color: 'text.primary',
          p: 2,
        }}
        spacing={2}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton sx={{ mr: 1 }} color="inherit">
            <SettingsIcon />
          </IconButton>
        </Container>
        {theme.palette.mode === 'dark' ? <img src={whiteLogo} className="App-logo" alt="logo" /> : <img src={blackLogo} className="App-logo" alt="logo" />}
        <Stack
          sx={{
            paddingTop: 3,
            paddingRight: 10,
            paddingLeft: 10,
            minHeight: '400px'
          }}
          spacing={2}
        >
          <TextField
            disabled
            id="standard-disabled"
            label="Current URL"
            value={currentUrl}
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Account
            </InputLabel>
            <NativeSelect
              defaultValue={0}
              inputProps={{
                name: 'account',
                id: 'uncontrolled-native',
              }}
            >
              <option value={0}>Select an Account</option>
              <option value={10}>Account#1</option>
              <option value={20}>Account#2</option>
              <option value={30}>Account#3</option>
            </NativeSelect>
          </FormControl>
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Select an Account</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={account}
              label="Selected Account"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Account#1</MenuItem>
              <MenuItem value={20}>Account#2</MenuItem>
              <MenuItem value={30}>Account#3</MenuItem>
            </Select>
         </FormControl> */}
          <Button variant="contained" endIcon={<KeyOutlinedIcon />}>
            Get Password
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
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
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
