import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useEffect} from 'react'

import AdminAddbar from './adminAddbar';
import { Container } from '@mui/system';
/*
function createData(id, name, servNum, classes, condition, ganbu) {
  return {
    id,
    name,
    servNum,
    classes,
    condition,
    ganbu,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}
*/
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.servNum}</TableCell>
        <TableCell align="right">{row.classes}</TableCell>
        <TableCell align="right">{row.condition}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                진료기록
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>날짜</TableCell>
                    <TableCell>진료과</TableCell>
                    <TableCell align="right">처방약 여부</TableCell>
                    <TableCell align="right">재진 여부</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.ganbu * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
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
    classes: PropTypes.string.isRequired,
    servNum: PropTypes.string.isRequired,

    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,

    id: PropTypes.string.isRequired,
    ganbu: PropTypes.bool.isRequired,
    condition: PropTypes.string.isRequired,
  }).isRequired,
};



/*const rows = [
  createData('634d66857ce1b5b851677ba7', '정회륜', '21-76051836', '병장', '진료중', false),
  createData('634d66ae7ce1b5b851678c45', '남혁', '21-76043383', '병장', '진료중인듯?', false),
  createData('634d669d7ce1b5b8516785e3', '서한유', '22-76015383', '상병', '진료완료', false),
];*/

export default function CollapsibleTable() {
  const [userList, setUserList] = React.useState(null);
  const [userList2, setUserList2] = React.useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/signup-private')
    .then((response) => response.json())
    .then((data) => setUserList(data));
}, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/signup-cadre')
    .then((response) => response.json())
    .then((data) => setUserList2(data));
}, []);

  return (
    <Container component='main'>
        <AdminAddbar />
        <TableContainer component={Paper}>
        <Table aria-label="군인 병원 기록">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell align="right">이름</TableCell>
                <TableCell align="right">군번</TableCell>
                <TableCell align="right">계급</TableCell>
                <TableCell align="right">관리</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {userList.map((row) => (
                <Row key={row.id} row={row} />
            ))}
            {userList2.map((row) => (
                <Row key={row.id} row={row} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Container>
  );
}
