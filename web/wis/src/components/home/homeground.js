import {useState} from "react";


function App() {
  const [isTrue, setIsTrue] = useState(false);
  function onClick() {
    setIsTrue(!isTrue);
  }
  return (
    <div>
        <div>
          <button>진료 희망</button>
        </div>
        <div>
          <button>진료 신청</button>
        </div>
        <div>
          <button>조치 내역</button>
        </div>
        <div>
          <button onClick={onClick}>추적 관리</button>
        </div>      
    </div>
  );
}

export default App;
