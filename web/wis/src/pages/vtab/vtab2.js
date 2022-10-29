import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Button, Container, Grid, Box, Paper} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Modal from 'react-modal';
import Snackbar from '@mui/material/Snackbar';

import ExplainBox from './vtab2Explain';
import MuiAlert from '@mui/material/Alert';
import './vtab.module.css';

/*
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
*/

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MultilineTextFields() {

  const minDate = dayjs('2020-01-01T00:00:00.000');
  const maxDate = dayjs('2034-01-01T00:00:00.000');

  const [dates, setdate] = React.useState(dayjs('2022-04-07'));
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  //snackBar start
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    else
      setState({ open: false, vertical: 'top', horizontal: 'center',});
  };

  //snackBar end
  const [values, setValues] = React.useState({
    hospital: "",
    inter: "",
    Classes: "",
});

const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
        ...values,
        [name]:value
    });
}

const onSubmitHandler = (event) => {
  const date = dayjs(dates).format("YYYY-MM-DD");
  const hospital = values.hospital;
  const inter = values.inter;
  const Classes = values.Classes;
  fetch('http://127.0.0.1:5000/main', {
    credentials: 'include',    
      method: 'POST',
      headers: {
          'content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        Classes,
        hospital,
        inter,
      }),
  });
  setState({ open: true, vertical: 'top', horizontal: 'center', });
  setModalIsOpen(false);
};

  return (
    <Container component="main" maxWidth>
      <ExplainBox />
      <Container>
      <Grid
      sx={{
        mt: 8, 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",}}>
      <Button 
      onClick={()=> setModalIsOpen(true)} 
      variant="contained">
      신청하기
      </Button>
      </Grid>
      </Container>
      <Modal className='container' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <Grid sx={{mt : 20}}></Grid>
      <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
      >
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'row',
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",
          }}
      >
        <TextField
          fullWidth
          id="classe"
          label="계급"
          placeholder="예)병장"
          name="Classes"
          sx={{mt : 3}}
          onChange={handleChange}
          multiline
        />

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
          placeholder="예) 오른쪽 귀가 자꾸 먹먹하고 잘 안들리는 경우가 많습니다. 또한 씻고 난 후 귀에서 진물이 나오는 경우가 종종 있습니다."
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
        <Box sx={{mt : 3}} />
    </Grid>
      </Paper>
      </Modal>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          제출에 성공하였습니다!
        </Alert>
      </Snackbar>
    </Container>
  );
}
