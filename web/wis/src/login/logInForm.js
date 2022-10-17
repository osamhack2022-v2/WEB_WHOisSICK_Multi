import React from "react";
import { Checkbox, TextField, Button, FormControlLabel, Grid, Avatar, Box, Container } from "@mui/material";
import {Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { Link } from 'react-router-dom';
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

    fetch("http://127.0.0.1:5000/")
    .then((response) => {
        if(response.ok) {
            return response.json();
        }  
        throw new Error('Network response was not ok.');
    }).then((data) => {
       console.log(JSON.stringify(data));
    }).catch((error) => {
        console.log(`error: ${error}`)
    });


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
                        <Link to="/signup-select">회원가입</Link>
                    </Grid>
                </Grid>
                    <Button
                    onClick={() => navigate('/main')} 
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{mt: 2}}
                    >
                        로그인
                    </Button>
            </Box>
        </Container>
    )
}

export default MuiLoginForm;