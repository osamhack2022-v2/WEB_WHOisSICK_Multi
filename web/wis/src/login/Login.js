import LoginForm from './logInForm';
//import SignUpForm from '../signUp/layout';
/*
import {Paper, Grid} from '@mui/material';

return (
  <Grid 
  sx={{
    mt : 10,
  }}>
    <Paper
    elevation={10}
    sx={{
      p: 2,
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1,
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}
    >
      <LoginForm />
    </Paper>
  </Grid>
);
}*/

function Login() {
  return (
        <LoginForm />
  );
  }

export default Login;