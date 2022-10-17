import styles from './Layout.module.css';
import React from "react";
import Tabss from './vtab/vtab4';
//tab 수정


function R4() {
  return (
    <div className={styles.boxe}>
      <div className={styles.rightb}>
        추적 관리
        <Tabss></Tabss>
      </div>
    </div>
  );
}

export default R4;