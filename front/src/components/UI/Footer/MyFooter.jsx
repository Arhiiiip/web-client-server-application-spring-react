import React from "react";
import styles from './MyFooter.module.css'

const MyFooter = (props) => {
    return (
        <div className={styles.footer}>
            <a>Author: Riabokon Arhip Borisovich</a> <br/>
            <a>rabokony@icloud.com</a> <br/>
            <a href={'https://github.com/Arhiiiip'} className={styles.git} >Go to the developer's github</a>
        </div>
    );
};

export default MyFooter;