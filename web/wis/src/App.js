// src/App.js
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import R1 from './pages/mainpage';
import R2 from './signUp/layout';

import "./login/styles.css";
//import "./signUp/layout.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/r1" element={<R1 />} />
            <Route path="/r2" element={<R2 />} />
        </Routes>
    );
}

export default App;