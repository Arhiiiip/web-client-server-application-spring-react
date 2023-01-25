import React from 'react';
import MyButton from "../../MyButton/MyButton";
import styles from "./Logout.module.css";


const Logout = (props) => {
    return (
        <div className={styles.logout}>
            <MyButton name={'Logout'} method={props.method}/>
        </div>
    );
};

export default Logout;