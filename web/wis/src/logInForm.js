import React from "react";

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
    <span>Test value : {value}</span>
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
    </form>
}

export default LoginForm;