import styles from './Layout.module.css';
import React from "react";
import Tabss from './vtab/vtab';

function R1() {



  return (
      <div className={styles.boxe}>
        <div className={styles.rightb}>
          진료 희망자
        <Tabss></Tabss>
        </div>
      </div>
  );
}

export default R1;