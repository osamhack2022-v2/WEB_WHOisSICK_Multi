import styles from './Header.module.css';
import alogo from '../../data/aplogo.png';

function Header() {
  return (
    <div  className={styles.header}>
        <img src={alogo} alt="logo" className={styles.logo} />
    </div>
    );
}

export default Header;