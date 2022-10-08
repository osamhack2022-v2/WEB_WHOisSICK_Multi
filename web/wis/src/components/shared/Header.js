import styles from './Header.module.css';
import alogo from '../../data/aplogo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div  className={styles.header}>
        <img src={alogo} alt="logo" className={styles.logo} />
        <div>
          <Link to="/r1">진료 희망자</Link>
        </div>
        <div>
          <Link to="/r2">진료 신청</Link>
        </div>
        <div>
          <Link to="/r3">조치 내역</Link>
        </div>
        <div>
          <Link to="/r4">추적 관리</Link>
        </div>
        <div>
          <Link to="/">로그아웃</Link>
        </div>
    </div>
    );
}

export default Header;