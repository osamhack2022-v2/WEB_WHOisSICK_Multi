import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Stack, Grid, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Container } from '@mui/system';
import Modal from 'react-modal';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const [okValue, setOkValue] = React.useState(3);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  
  const [value, setValue] = React.useState();

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSudmit = () => {
    if(checked)
      setOkValue(4);
    else 
      setOkValue(5);
    
      const inter = value;
      const _id = row._id;
      const ok = okValue;
      fetch('http://127.0.0.1:5000/admin/result', {
        credentials: 'include',    
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id,
          ok,
          inter,
        }),
    })
}

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>

        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.sn}</StyledTableCell>
        <StyledTableCell align="right">{row.Classes}</StyledTableCell>
        <StyledTableCell align="right">
            {okValue === 3 ? "대기" : (okValue === 4 ? "재진" : "승인")}
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                진료결과
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell align="left">진료과</TableCell>
                    <TableCell align="left">환자증상</TableCell>
                    <TableCell align="right">처방여부</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {row.day}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.hospital}</StyledTableCell>
                      <StyledTableCell align="left">{value}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Stack direction="row-reverse" spacing={1} align="right">
                            <Button onClick={()=> setModalIsOpen(true)}>처방입력</Button>
                            <Modal className='container' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
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
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    <TextField
                                    id="cont"
                                    label="신청 내용"
                                    multiline
                                    rows={12}
                                    name="inter"
                                    placeholder="두통약 처방"
                                    fullWidth
                                    sx={{mt : 3}}
                                    value={value}
                                    onChange={handleChange}
                                    />
                                  <FormControlLabel
                                  checked={checked}
                                  control={<Checkbox value="재진여부" color="primary"/>}
                                  label="재진여부 확인"
                                  onChange={handleChecked}
                                  />
                                <Button 
                                variant='contained' 
                                onClick={handleSudmit}
                                sx={{mt: 3}}>제출하기</Button>
                                </Grid>
                            </Paper>
                            </Modal>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    Classes: PropTypes.string.isRequired,
    sn: PropTypes.string.isRequired,
    ok: PropTypes.number.isRequired,
    hospital: PropTypes.string.isRequired,
    inter: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
  }).isRequired,
};


/*
const rows = [
  createData('남혁', '21', '병장', '진료중인듯?', false),
  createData('서한유', '22', '상병',  '진료완료', false),
];
*/
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function AdminTracker() {
  
  const [userList, setUserList] = React.useState(null);

  function getUserListPrivate () {

    let reqOtion = {
      credentials: 'include',
      method : "get",
      headers : {
        "content-type" : "application/json"
      }
    }
    fetch('http://127.0.0.1:5000/main/resultlist', reqOtion)
    .then((response) => response.json())
    .then((data) => setUserList(data));
  }
  
  getUserListPrivate();

  return (
    <Container component='main' maxWidth>
        <TableContainer component={Paper}>
        <Table aria-label="군인 병원 기록">
            <TableHead>
            <TableRow>
                <StyledTableCell/>
                <StyledTableCell>이름</StyledTableCell>
                <StyledTableCell align="right">군번</StyledTableCell>
                <StyledTableCell align="right">계급</StyledTableCell>
                <StyledTableCell align="right">승인여부</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {userList && userList.map((row) => (
                <Row key={row._id} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Container>
  );
}
