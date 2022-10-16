import styles from './Layout.module.css';
import React from "react";
import Tabss from './vtab/vtab3';
//t ab 수정
function R3() {
  return (
    <div className={styles.boxe}>
      <div className={styles.rightb}>
        조치 내역
        <Tabss></Tabss>
      </div>
    </div>
  );
}

export default R3;