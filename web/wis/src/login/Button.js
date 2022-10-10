import propTypes from "prop-types";
import { loginValue } from "./logInForm";
import { NavLink } from 'react-router-dom';

const onClick = () => {
    console.log(loginValue[0]);
    console.log(loginValue[1]);
}

const NavLinkBtn = ({text}) => {
    return <NavLink
    id="LogInBtn"
    to="/r1"
    onClick={onClick}
    >{text}</NavLink>
}

NavLinkBtn.propTypes = {
    text: propTypes.string.isRequired,
}

export default NavLinkBtn;