import Layout from '../components/shared/Layout';
import styles from './routing.module.css';

function R1() {
  return (
    <Layout>
      <div1 className={styles.boxe}>
        <div className={styles.leftb}>
          진료 희망자
        </div>
        <div className={styles.rightb}>
          사람 목록
        </div>
      </div1>
    </Layout>
  );
}

export default R1;