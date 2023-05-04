import * as React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SyncIcon from '@mui/icons-material/Sync';  
import { saveSyncCode, countWords } from './Util';

export default function JoinSync() {
  const [syncCode, setSyncCode] = React.useState('');

  const handleJoinButtonClick = () => {
    saveSyncCode(syncCode);
  }

  return (
    <>
      <Stack
        sx={{
          justifyContent: 'space-between',
          color: 'text.primary',
          p: 8,
        }}>
          <Typography>
            Enter your <b>25 words </b>Sync Code:
          </Typography>
          <Box
            border={1} borderColor="text.disabled" borderRadius={1} padding={1}
          >
            <Stack
              sx={{
              justifyContent: 'space-between',
              color: 'text.primary',
              textAlign: 'center'
              }}
              spacing={1}
            >
              <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  placeholder='Sync Code'
                  value={syncCode}
                  onChange={(event) => setSyncCode(event.target.value)}
              />
              <Typography color='text.disabled'>Word count: {countWords(syncCode)}</Typography>
              <Button variant="contained" endIcon={<SyncIcon />} onClick={handleJoinButtonClick}>
                Join
              </Button>           
            </Stack>
          </Box>
        </Stack> 
    </>
  );
}