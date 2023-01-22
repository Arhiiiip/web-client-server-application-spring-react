import React from "react";
import styles from './MyHeader.module.css'
import Logout from "./Logout/Logout";
import MyButton from "../MyButton/MyButton";
import swipe from "bootstrap/js/src/util/swipe";

const MyHeader = (props) => {

    const logout = () => {
        props.setLog("log");
        localStorage.setItem('token', '')
    }

    const back = () => {
        props.setLog("mid");
    }

    const godMode = () => {
        props.setLog("god")
    }

    return (
        <div className={styles.header}>
            <div className={styles.aboutInfo}>
                <p> Riabokon Arhip Borisovich P32302
                    Variant: 13458</p>
            </div>
            <div className={styles.user_container}>
                {props.isLog === "log" ? <div/> :
                    props.isLog === "mid" ?
                        props.isAdmin ?
                            <div className={styles.buttS}><MyButton name={"God mode"} method={godMode}/><Logout method={logout}/></div> :
                            <Logout method={logout}/> :
                        <div className={styles.buttS}><MyButton name={"Back"} method={back}/></div>
                        }
            </div>
        </div>
    )

}

export default MyHeader