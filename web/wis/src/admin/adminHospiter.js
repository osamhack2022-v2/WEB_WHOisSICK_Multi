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
import { Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Container } from '@mui/system';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [okValue, setOkValue] = React.useState(row.ok);
  //승인과 미승인일 경우 포스트 요청하는걸 여기다 넣을 거임
  const handleOkBoolean = (event) => {
    if(event.target.innerText === "승인") {
      setOkValue(1);
      const _id = row._id;
      const ok = 1;
      fetch('http://127.0.0.1:5000/main/hope', {
          credentials: 'include',    
          method: 'POST',
          headers: {
              'content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id,
            ok,
          }),
      })
    }

    else if(event.target.innerText === "미승인") {
      setOkValue(0);
      const _id = row._id;
      const ok = 0;
      fetch('http://127.0.0.1:5000/main/hope', {
          credentials: 'include',    
          method: 'POST',
          headers: {
              'content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id,
            ok,
          }),
      })
    }
}

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.sn}</StyledTableCell>
        <StyledTableCell align="right">{row.Classes}</StyledTableCell>
        <StyledTableCell align="right">
            {okValue === 1 ? "승인" : (okValue === 2 ? "승인전" : "미승인")}
        </StyledTableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                환자희망사항
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell align="left">진료과</TableCell>
                    <TableCell align="left">환자증상</TableCell>
                    <TableCell align="right">승인버튼</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {row.day}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.hospital}</StyledTableCell>
                      <StyledTableCell align="left">{row.inter}</StyledTableCell>
                      <StyledTableCell align="right">
                        <Stack direction="row-reverse" spacing={1} align="right">
                          <Button onClick={handleOkBoolean} color="error">미승인</Button>
                          <Button onClick={handleOkBoolean}>승인</Button>
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
    _id: PropTypes.string.isRequired,
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
function createData(name, sn, Classes, inter, ok, hospital, day) {
  return {
    name,
    sn,
    Classes,
    inter,
    ok,
    hospital,
    day,
  };
}

const rows = [
  createData('남혁', '21-12351', '병장', '머리가 아파요', 2, '내과', '10/12'),
  createData('서한유', '22-54245', '상병',  '마음이 아파요', 2, '안과', '10/30'),
  createData('정회륜', '21-2244245', '병장',  '위가 아파요', 2, '내과', '11/30'),
  createData('국동희', '22-36345', '상병',  '어디아프니', 2, '사과', '12/30'),
  createData('수병쉨', '22-612344', '짬찌',  '시간이안가요', 2, '국방부', '1/30'),
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
    fetch('http://127.0.0.1:5000/main/hopelist', reqOtion)
    .then((response) => response.json())
    .then((data) => setUserList(data));
  }
  
  React.useEffect(() => {
    getUserListPrivate();
  }, []);

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
