import styles from './Layout.module.css';
import Header from './Header.js';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.layout}>
        {children}
      </div>
    </div>
  );
}

export default Layout;