import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Button, Container, Grid} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MultilineTextFields() {

  const minDate = dayjs('2020-01-01T00:00:00.000');
  const maxDate = dayjs('2034-01-01T00:00:00.000');

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
    credentials: 'include',    
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
    <Container component="main" maxWidth="sm">
        <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'row',
          mt : 6
      }}
        >
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
      </Grid>

      <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "center",
            }}
      >
        <TextField
          fullWidth
          id="ho"
          label="진료과"
          placeholder="예)정형외과"
          name="hospital"
          sx={{mt : 3}}
          onChange={handleChange}
          multiline
        />
        <TextField
          id="cont"
          label="신청 내용"
          multiline
          rows={12}
          name="inter"
          fullWidth
          sx={{mt : 3}}
          onChange={handleChange}
        />
    <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{mt: 3}}
        onClick={onSubmitHandler}
        >
     제출
    </Button>
    </Grid>
    </Container>
  );
}
