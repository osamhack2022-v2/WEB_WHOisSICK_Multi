import React from "react";
import { Checkbox, TextField, Button, FormControlLabel, Grid, Box, Container } from "@mui/material";
import {Typography} from "@mui/material";
import { Link } from 'react-router-dom';
import Logo from '../data/logo.png';
import { useNavigate } from "react-router-dom";

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
        const servNum = values.id;
        const password = values.password;
        fetch('http://127.0.0.1:5000/', {
            credentials: 'include',    
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                servNum,
                password,
            }),
        })
        .then((res)=>{
            console.log( "그 결과는~~?",res);
            if(res === "로그인 성공")
            {
                window.location.replace("/main");
                return ;
            }
            else { 
                console.log("이프문이 작동 안 했네용 ㅠㅠ")
            }
        })
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
                <img class="image" src={Logo} alt='  ' />

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
                        <Link to="/signup-select">회원가입</Link>
                    </Grid>
                </Grid>
                    <Button
                    onClick={onSubmitHandler} 
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{mt: 2}}
                    >
                        로그인
                    </Button>

                    <Button
                    onClick={() => navigate("/main")} 
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{mt: 2}}
                    >
                        일단 이동해
                    </Button>
            </Box>
        </Container>
    )
}

export default MuiLoginForm;