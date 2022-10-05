import './App.css';
import Layout from './components/shared/Layout';
import {useState} from "react";

function App() {
  const [isTrue, setIsTrue] = useState(false);
  function onClick() {
    setIsTrue(!isTrue);
  }
  return (
    <Layout>
      <div>
        <button onClick={onClick}>True?</button>
        {isTrue && <h1>True!</h1>}
        {!(isTrue) && <h1>false</h1>}
      </div>
     
    </Layout>
  );
}

export default App;
