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

  const [dates, setdate] = React.useState(dayjs('2022-04-07'));

  const [values, setValues] = React.useState({
    hospital: "",
    inter: ""
});

const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
        ...values,
        [name]:value
    });
}

const onSubmitHandler = (event) => {
  event.preventDefault();
  const date = dates;
  const hospital = values.hospital;
  const inter = values.inter;
  fetch('http://127.0.0.1:5000/main', {
      method: 'POST',
      headers: {
          'content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        hospital,
        inter,
      }),
  });
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
          value={dates}
          minDate={minDate}
          maxDate={maxDate}
          mask={"____-__-__"}
          onChange={(newValue) => {
            setdate(newValue);
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
          onChange={handleChange}
          multiline
        />
    </div>
    <div>
        <TextField
          id="cont"
          label="신청 내용"
          multiline
          rows={12}
          onChange={handleChange}
        />
    </div>
    <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{mt: 2}}
        onClick={onSubmitHandler}
        >
     제출
    </Button>
    </Box>
  );
}
