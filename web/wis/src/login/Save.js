import React from "react";
import { Link } from 'react-router-dom';

const Form = () => {
    const [inputs, setInputs] = React.useState({
        name: "",
        age: "",
        servNum: "",
        id: "",
        password: "",
    });

    const onSubmit = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    const onChangeInput = (event) => {
        const { value, name } = event.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    return <form onSubmit={onSubmit}>
        <p>
            <label htmlFor="enterName">이름 </label>
            <input 
            id="enterName" 
            placeholder="input your name"
            name="name"
            value={inputs.name}
            onChange={onChangeInput}
            ></input>
            <sapn>test name : {inputs.name}</sapn>
        </p>
        <p>
            <label htmlFor="enterAge">나이 </label>
            <input 
            id="enterAge" 
            placeholder="input your age"
            name="age"
            value={inputs.age}
            onChange={onChangeInput}
            ></input>
        </p>
        <p>
            <label htmlFor="enterArmyNum">군번 </label>
            <input 
            id="enterArmyNum" 
            placeholder="input your servNum"
            name="servNum"
            value={inputs.servNum}
            onChange={onChangeInput}
            ></input>
        </p>
        <p>
            <label htmlFor="enterId">아이디 </label>
            <input 
            id="enterId" 
            placeholder="input your id"
            name="id"
            value={inputs.id}
            onChange={onChangeInput}
            ></input>
        </p>
        <p>
            <label htmlFor="enterPassword">비밀번호 </label>
            <input 
            id="enterPassword" 
            placeholder="input your password"
            name="password"
            value={inputs.password}
            onChange={onChangeInput}
            ></input>
        </p>
        <p>
            <label htmlFor="enterRePassword">비밀번호 재확인 </label>
            <input id="enterRePassword" placeholder="input your password"></input>
        </p>
        <Link to="/">로그인</Link>
    </form>
}

export default Form;