import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from './vtab.module.css';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MultilineTextFields() {

  const minDate = dayjs('2020-01-01T00:00:00.000');
  const maxDate = dayjs('2034-01-01T00:00:00.000');

  const [value, setValue] = React.useState('Controlled');
  const [date, setDate] = React.useState(dayjs('2022-04-07'));

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="진료희망날짜"
          openTo="year"
          views={['year', 'month', 'day']}
          value={date}
          minDate={minDate}
          maxDate={maxDate}
          mask={"____-__-__"}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
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
