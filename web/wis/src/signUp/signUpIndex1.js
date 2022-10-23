import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Container} from '@mui/system';
import { Typography, Button, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";

import Logo from '../data/logo.png';
import signUpIconV1 from '../data/간부.png';
import signUpIconV2 from '../data/용사.png';

//용사 간부 선택 페이지
export default function Variants() {
  const navigate = useNavigate();

  return (
    <Container component="main" maxwidth="xs">

      <Grid
      id="아이콘 및 큰 제목"
      container
      sx={{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",}}
      >
         
         <img class="image" src={Logo} alt='  ' />
        <Typography variant="h5" component="h5">회원가입 유형 선택</Typography>
      </Grid>

      <Grid
        container
        id="회원가입 그리드"
        sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "center",
            '& > :not(style)': {
            m: 0,
            width: 330,
            height: 250,
            },
        }}
        >

        <Paper variant="outlined" square>
          <Grid
          id="간부 회원 가입"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}>
            <Typography variant="h6" component="h6" sx={{mb:3, borderBottom: 1}}>간부 회원 가입</Typography>
            <img src={signUpIconV1} alt="  " />
            <Button variant="contained" sx={{mt:3}} onClick={() => navigate('/signup-cadre')} >간부 회원가입</Button> 
          </Grid>
        </ Paper>

        <Paper variant="outlined" square>
          <Grid
          id="용사 회원 가입"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}>
            <Typography variant="h6" component="h6" sx={{mb:3, borderBottom: 1}}>용사 회원 가입</Typography>
            <img src={signUpIconV2} alt="  " />
            <Button variant="contained" sx={{mt:3}} onClick={() => navigate('/signup-private')} >용사 회원가입</Button> 
          </Grid>
        </Paper>

        </Grid>


    </Container>
  );
}