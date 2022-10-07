import styles from '././App.css';
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
