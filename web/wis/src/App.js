// src/App.js
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import R1 from './pages/routing1';
import R2 from './pages/routing2';
import R3 from './pages/routing3';
import R4 from './pages/routing4';

function App() {
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


/*import styles from '././App.css';
import Layout from './components/shared/Layout';
import Home from './components/home/homeground';
import {useState} from "react";
import dummy from "./data/test.json"
import logp from "./components/shared/login.json"

function App() {
  var [isTrue, setIsTrue] = useState(false);
  //isTrue=parseInt({logp});
  function onClick() {
    setIsTrue(!isTrue);
  }
  return (
    <div>
      <Layout>    
        
        <div>
          {isTrue && <Home></Home>}
          {!(isTrue) && <h1>
            <input className={styles.input} />
            <br></br>
            <input className={styles.input} />
            <button onClick={onClick}>log in</button>
          
            </h1>}
        </div>
      
      </Layout>
      {dummy[2]}
    </div>
  );
}

export default App;
*/