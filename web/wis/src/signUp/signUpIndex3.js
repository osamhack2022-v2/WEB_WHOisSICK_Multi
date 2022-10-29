import * as React from 'react';
import { Grid, TextField, Typography, Button} from '@mui/material';
import Logo from '../data/logo.png';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
//mport { useNavigate } from "react-router-dom";
import "./layout.css";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

//간부 페이지
export default function SignUpIndexV2(){
    //const navigate = useNavigate();

    const [state, setState] = React.useState({
        openSnack: false,
        vertical: 'top',
        horizontal: 'center',
      });
    
      const { vertical, horizontal, openSnack } = state;
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        else
          setState({ open: false, vertical: 'top', horizontal: 'center',});
      };

    const [values, setValues] = React.useState({
        sn: "",
        password: "",
        name: "",
        ganbu: true
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
        const sn = values.sn;
        const password = values.password;
        const name = values.name;
        const ganbu = values.ganbu;
        fetch('http://127.0.0.1:5000/signup-cadre', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                sn,
                password,
                name,
                ganbu,
            }),
        });
        setState({ openSnack: true,  vertical: 'top', horizontal: 'center',});
    };


    return (
    <Container component="main" maxWidth>
        <Grid container sx={{borderBottom: 1, borderBottomColor: 'grey.500'}}>
            <Grid item xs>
                <img class="image" src={Logo} alt=' ' />
            </Grid>

            <Grid item
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: "center",}}>
                <Link to="/">로그인  </Link>
                 <sapn>  |  </sapn>
                <Link to="/signup-select">  회원가입 </Link>
            </Grid>
        </Grid>

        <Grid
        id="아이콘 및 큰 제목"
        container
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",}}
        >
            <img className="image" src={Logo} alt='  ' />
        <Typography variant="h5" component="h5">간부 회원가입</Typography>
        </Grid>

        <Container
        id="군번 및 비밀번호 입력"
        maxWidth="sm"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center"
        }}
        >
            <TextField
            margin="normal"
            label="군번" 
            required 
            name="sn"
            autoFocus
            onChange={handleChange} 
            variant="standard"
            fullWidth
            sx={{marginTop: 8}}
            />

            <TextField
            margin="normal"
            label="비밀번호" 
            //type="password" 
            required 
            fullWidth
            name="password"
            autoComplete="current-password" 
            onChange={handleChange} 
            variant="standard"
            />

            <TextField
            margin="normal"
            label="이름" 
            required 
            name="name"
            onChange={handleChange} 
            variant="standard"
            fullWidth
            sx={{marginTop: 8}}
            />

            <Button
                onClick={onSubmitHandler} 
                fullWidth
                variant="contained"
                size="large"
                sx={{mt: 2}}
                >
                    회원가입
                </Button>
        </Container>
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={openSnack} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                회원가입에 성공하였습니다!
            </Alert>
        </Snackbar>
    </Container>
    );
}