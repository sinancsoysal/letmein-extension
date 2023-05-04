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
import { Container, Stack, maxHeight, maxWidth, minHeight } from '@mui/system';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import DevicesIcon from '@mui/icons-material/Devices';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Devices from './components/Devices';
import AddDevice from './components/AddDevice';
import JoinSync from './components/JoinSync';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function getTheme(prefersDarkMode: boolean): 'light' | 'dark' {
  const theme = localStorage.getItem('theme');
  if (theme) {
    return theme as 'light' | 'dark';
  } else {
    const initialTheme = prefersDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', initialTheme);
    return initialTheme;
  }
}

function App() {  
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleHideSettings = () => {
    setShowSettings(false);
  };

  const [showDevices, setShowDevices] = useState(false);

  const handleDevicesClick = () => {
    setShowDevices(true);
  };

  const handleHideDevices = () => {
    setShowDevices(false);
  };

  const [showAddDevice, setShowAddDevice] = useState(false);

  const handleAddDeviceClick = () => {
    setShowAddDevice(true);
  };

  const handleHideAddDevice = () => {
    setShowAddDevice(false);
  };

  const [showJoin, setShowJoin] = useState(false);

  const handleJoinClick = () => {
    setShowJoin(true);
  };

  const handleHideJoin = () => {
    setShowJoin(false);
  };

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
          <IconButton sx={{ mr: 1 }} color="inherit" onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
        </Container>
        {theme.palette.mode === 'dark' ? <img src={whiteLogo} className="App-logo" alt="logo" /> : <img src={blackLogo} className="App-logo" alt="logo" />}
        <Stack
          sx={{
            paddingTop: 4,
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
        <div className='footer'>
          © {new Date().getFullYear()} Copyright:&nbsp;
          <a className='App-link' href="https://sinancansoysal.com" target="_blank" rel="noreferrer">Sinan Can SOYSAL</a>
        </div>
      </Stack>
      <Dialog fullScreen open={showSettings} onClose={handleHideSettings}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Stack
            sx={{
              justifyContent: 'space-between',
              color: 'text.primary',
              p: 15,
            }}
            spacing={5}
          >
            <Button variant="contained" endIcon={<DevicesIcon />} onClick={handleDevicesClick}>
              Synced Devices
            </Button>
            <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddDeviceClick}>
              Add New Device
            </Button>
            <Button variant="contained" endIcon={<SyncIcon />} onClick={handleJoinClick}>
              Join Sync Chain
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHideSettings}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullScreen open={showDevices} onClose={handleHideDevices}>
        <DialogTitle>Devices</DialogTitle>
        <DialogContent>
          <Devices />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHideDevices} startIcon={<ArrowBackIosNewIcon />}>Go Back</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullScreen open={showAddDevice} onClose={handleHideAddDevice}>
        <DialogTitle>Add Device</DialogTitle>
        <DialogContent>
          <AddDevice />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHideAddDevice} startIcon={<ArrowBackIosNewIcon />}>Go Back</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullScreen open={showJoin} onClose={handleHideJoin}>
        <DialogTitle>Join Sync</DialogTitle>
        <DialogContent>
          <JoinSync />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHideJoin} startIcon={<ArrowBackIosNewIcon />}>Go Back</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function ToggleColorMode() {
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
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}