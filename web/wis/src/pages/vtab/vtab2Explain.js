import * as React from 'react';
import {Typography, Grid, Container, Avatar} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@material-ui/styles';

const themes = createTheme({
    typography: {
      h6: {
        color: 'blue'
      },
    }
  });

export default function ExplainBox() {
    return (
        <Container component="main">
        <Grid
        sx={{
            mt : 8,
            borderBottom : 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",}}>
        <Typography variant="h4" gutterBottom>신청하기 전 주의사항</Typography>
        <Typography variant="h6" gutterBottom>한 번씩은 필독 바랍니다.</Typography>
        </Grid>
        <Grid
        sx={{
            mt: 8, 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "center",}}>
                
        <Avatar sx={{bgcolor: blue[500]}}>
        <CalendarMonth />
        </Avatar>
            <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: "center",}}>
            <ThemeProvider theme={themes}>
            <Typography variant="h6">캘린더 사용 시</Typography>
            <Typography variant="subtitle1" gutterBottom>
                신청할 일자를 선택하시면 승인 후 진료받는 시간을 알려드립니다.
            </Typography>
            </ThemeProvider>
            </Grid>
        </Grid>
        </Container>
    );
}