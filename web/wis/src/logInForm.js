import React from "react";
import Button from "./Button";

const Input = ({text}) => {
    const [value, changeId] = React.useState(0);
    const onChanges = (event) => {
        changeId(event.target.value);
    }
    return <div>
        <input
        value={value}
        onChange={onChanges}
        type="text" 
        placeholder={text}
        id={text}
    />
    </div> 
}

const Select = () => {
    const onChange = (event) => {
        console.log(event.target.value);
    }
    return <select onChange={onChange}>
        <option value="0">용사</option>
        <option value="1">간부</option>
    </select>
}

const MemorizedInput = React.memo(Input);

const LoginForm = () => {
    return <form>
        <Select />
        <MemorizedInput text="Id"/>
        <MemorizedInput text="Password"/>
        <Button text="Log In!" fontSize={40}/>
    </form>
}

export default LoginForm;