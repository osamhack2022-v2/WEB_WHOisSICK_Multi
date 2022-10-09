import propTypes from "prop-types";
import { Link } from 'react-router-dom';

const onClick = (valueId, valuePassword) => {
    console.log(valueId);
    console.log(valuePassword);
}

const Btn = ({text, fontSize}) => {
    return <button style={{
        fontSize,
        }} onClick={onClick}>
        <Link to="/r1">{text}</Link>
        </button>
}

Btn.propTypes = {
    text: propTypes.string.isRequired,
    fontSize: propTypes.number.isRequired,
}

export default Btn;