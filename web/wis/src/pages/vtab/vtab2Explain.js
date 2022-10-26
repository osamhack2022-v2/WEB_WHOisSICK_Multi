import * as React from 'react';
import {Typography, Grid, Container, Avatar} from '@mui/material';
import { CalendarMonth,  LocalHospital, SpatialAudioOff } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

export default function ExplainBox() {
    return (
        <Container component="main" maxWidth="sm">
        <Grid
        sx={{
            mt : 8,
            borderBottom : 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",}}>
        <Typography
        sx={{fontWeight: 'bold', color: blue[500]}}
        variant="h4" 
        gutterBottom>신청하기 전 주의사항</Typography>
        <Typography variant="h6" sx={{fontWeight: 'bold'}} gutterBottom>한 번씩은 필독 바랍니다.</Typography>
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
                ml: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: "center",}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', color: blue[500]}}>캘린더 사용 시</Typography>
            <Typography variant="subtitle1" gutterBottom>
                신청할 일자를 선택하시면 승인 후 진료받는 시간을 알려드립니다.
            </Typography>
            </Grid>
        </Grid>

        <Grid
        sx={{
            mt: 8, 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "center",}}>
        <Avatar sx={{bgcolor: blue[500]}}>
        <LocalHospital />
        </Avatar>
            <Grid
            sx={{
                ml: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: "center",}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', color: blue[500]}}>해당 진료과 작성 시</Typography>
            <Typography variant="subtitle1" gutterBottom>
                아픈 증상으로 보고 무슨 진료과인지 모른다면 "알수없음"으로 기입해주시길 바랍니다.
            </Typography>
            </Grid>
        </Grid>

        <Grid
        sx={{
            mt: 8, 
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "center",}}>
        <Avatar sx={{bgcolor: blue[500]}}>
        <SpatialAudioOff />
        </Avatar>
            <Grid
            sx={{
                ml: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: "center",}}>
            <Typography variant="h6" sx={{fontWeight: 'bold', color: blue[500]}}>증상 작성 시</Typography>
            <Typography variant="subtitle1" gutterBottom>
                자기가 아픈 곳이 어딘지, 어떤식으로 아픈지 적어야 정확한 진료가 가능합니다.
                예시. 오른쪽 귀가 자꾸 먹먹하고 잘 안들리는 경우가 많습니다. 또한 씻고 난 후 귀에서 진물이 나오는 경우가 종종 있습니다.
            </Typography>
            </Grid>
        </Grid>
        </Container>
    );
}