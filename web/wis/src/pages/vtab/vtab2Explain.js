import * as React from 'react';
import {Typography, Grid, Container} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';



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
        <Typography variant="h5" gutterBottom>신청하기 전 주의사항</Typography>
        <Typography variant="subtitle1" gutterBottom>한 번씩은 필독 바랍니다.</Typography>
        </Grid>
        <Grid
        sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "center",}}>
        
        <CalendarMonth color='primary' />
            <Grid
            sx={{
                display: 'flex',
                flexDirection: 'colum',
                alignItems: 'center',
                justifyContent: "center",}}>
            <Typography variant="subtitle1">캘린더 사용 시</Typography>
            <Typography variant="body1" gutterBottom>
                신청할 일자를 선택하시면 승인 후 진료받는 시간을 알려드립니다.
            </Typography>
            </Grid>
        </Grid>
        </Container>
    );
}