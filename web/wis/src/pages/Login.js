//import { Link } from 'react-router-dom';
import LoginForm from '../logInForm';
import Button from "../Button";

function Login() {
  return (
    <div>
      <LoginForm />
      <Button text="Log In!" fontSize={40}/>
    </div>
  );
  }

export default Login;