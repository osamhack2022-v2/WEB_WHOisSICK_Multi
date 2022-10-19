import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './vtab.module.css';
import Box from '@mui/material/Box';

export default function MultilineTextFields() {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '50ch' }
    }}
    noValidate
    autoComplete="off"
  >
    <div>
        <TextField
          id="date"
          label="날짜"
          placeholder="xx/xx"
          multiline
        />
    </div>
    <div>
        <TextField
          id="ho"
          label="진료과"
          placeholder="예)정형외과"
          multiline
        />
    </div>
    <div>
        <TextField
          id="cont"
          label="신청 내용"
          multiline
          rows={12}
        />
    </div>
    <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{mt: 2}}
        >
     제출
    </Button>
    </Box>
  );
}
