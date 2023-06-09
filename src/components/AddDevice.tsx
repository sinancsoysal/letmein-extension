import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AESDecrypt } from './Crypto';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { retrieveSyncCode, copyToClipboard, countWords } from './Util';

export default function AddDevice() {
  const syncCode = retrieveSyncCode ();

  const [open, setOpen] = React.useState(false);

  const handleTooltipOpen = () => {
    copyToClipboard(syncCode);
    setOpen(true);
    setTimeout(() => {
        setOpen(false);
      }, 4000);
  };
  return (
    <>
      <Stack
        sx={{
          justifyContent: 'space-between',
          color: 'text.primary',
          p: 8,
        }}>
          <Typography>
            On your target device, navigate to Add Device in settings and enter the sync chain code words shown below. 
            <b>Treat this code like a password. If someone gets ahold of it, they can read and modify your synced data.</b>
          </Typography>
          <Box
            border={1} borderColor="text.disabled" borderRadius={1} padding={1}
          >
            <Stack
              sx={{
              justifyContent: 'space-between',
              color: 'text.primary',
              }}
              spacing={1}
            >
              <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  defaultValue={syncCode}
                  disabled
              />
              <Stack direction={'row'}
                sx={{
                justifyContent: 'space-between',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center'
                }}>
                <Typography color='text.disabled'>Word count: {countWords(syncCode)}</Typography>
                <Stack direction={'row'} sx={{textAlign: 'right', display: 'flex', alignItems:'center'}}>
                  {open && 
                    <Typography 
                      color='text.disabled'  
                      sx={{
                        opacity: 0,
                        animation: 'fadeIn 1s ease-in forwards, fadeOut 2s ease-in forwards 1s',
                        '@keyframes fadeIn': {
                          from: { opacity: 0 },
                          to: { opacity: 1 },
                        },
                        '@keyframes fadeOut': {
                          from: { opacity: 1 },
                          to: { opacity: 0 },
                        },
                      }}>Copied!</Typography>}
                  <IconButton aria-label="copy" onClick={handleTooltipOpen}>
                    <ContentCopyIcon fontSize="small"/>
                  </IconButton>  
                </Stack>            
              </Stack>
            </Stack>
          </Box>
        </Stack> 
    </>
  );
}