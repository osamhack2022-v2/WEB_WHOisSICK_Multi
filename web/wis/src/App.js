// src/App.js
import { Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import R1 from './pages/mainpage';
import R2 from './signUp/signUpIndex1';
import R3 from './signUp/signUpIndex2';
import R4 from './signUp/signUpIndex3';

import "./login/styles.css";
//import "./signUp/layout.css";

//r3가 용사 r4가 간부
function App() {
    /*여기부터
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
    여기까지 패치 되는지 확인용.*/
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/r1" element={<R1 />} />
            <Route path="/r2" element={<R2 />} />
            <Route path="/r3" element={<R3 />} />
            <Route path="/r4" element={<R4 />} />
        </Routes>
    );
}

export default App;