import styles from './Layout.module.css';
import Header from './Header.js';
import Menu from './Menu.js';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.layout}>
        <div className={styles.contents}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;