import React, { useEffect } from "react";
import { Checkbox, TextField, Button, FormControlLabel, Grid, Avatar, Box, Container } from "@mui/material";
import {Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function App() {

    //데이터 받아오기
    useEffect(() => {
        fetch('https://osamhack2022-web-whoissick-multi-4ww6jgw94gw3jxwx-3000.githubpreview.dev/')
        .then((response) => response.json())
        .then((data) => console.log(data));
    }, []);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        fetch('https://osamhack2022-web-whoissick-multi-4ww6jgw94gw3jxwx-3000.githubpreview.dev/login', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                //데이터 값 넣어주기
            }),
        });
    }
}

const MuiLoginForm = () => {

    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        id: "",
        password: ""
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
        const id = values.id;
        const password = values.password;
        fetch('https://osamhack2022-web-whoissick-multi-4ww6jgw94gw3jxwx-3000.githubpreview.dev/login', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                password,
            }),
        });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Avatar sx={{m: 1, bgcolor:'secondary.main'}}>
                <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{mb: 3}}>
                    로그인
                </Typography>

                <TextField
                margin="normal"
                label="군번" 
                required 
                fullWidth
                name="id"
                autoFocus
                onChange={handleChange}
                />
                <TextField
                margin="normal"
                label="비밀번호" 
                type="password" 
                required 
                fullWidth
                name="password"
                autoComplete="current-password" 
                onChange={handleChange}
                />
                <Grid container>
                    <Grid item xs>
                        <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="사용자 정보 저장"
                        />
                    </Grid>
                    <Grid item sx={{mt: 1.2}}>
                        <Link to="">비밀번호 찾기</Link>
                        <sapn>  |  </sapn>
                        <Link to="/r2">회원가입</Link>
                    </Grid>
                </Grid>
                    <Button
                    onClick={() => navigate('/r1')} 
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{mt: 2}}
                    >
                        로그인
                    </Button>

                    <Button
                    onClick={onSubmitHandler} 
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{mt: 5}}
                    >
                        값 테스트
                    </Button>
            </Box>
        </Container>
    )
}

export default MuiLoginForm;