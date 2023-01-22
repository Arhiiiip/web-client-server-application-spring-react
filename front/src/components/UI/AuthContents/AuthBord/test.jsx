import React, {useState} from 'react';
import MyButton from "../../MyButton/MyButton";
import styles from "./AuthBord.module.css";

const Test = () => {

    const [LoginOrRegister, setLorR] = useState(0);

    const [register, setRegister] = useState(() => {
        return {
            email: "",
            username: "",
            password: "",
            password2: "",
        }
    })

    const [login, setLogin] = useState(() => {
        return {
            emailOrUsername: "",
            password: "",
        }
    })

    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const changeInputLogin = event => {
        event.persist()
        setLogin(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const changeOnR = event => {
        setLorR(1);
    }

    const changeOnL = event => {
        setLorR(0);
    }

    if (LoginOrRegister === 0) {
        return (
            <div className={styles.bord}>
                <p>Name Or Email: <input
                    type="username"
                    id="username"
                    name="username"
                    value={login.emailOrUsername}
                    onChange={changeInputLogin}
                /></p>
                <p>Password: <input
                    type="password"
                    id="password"
                    name="password"
                    value={login.password}
                    onChange={changeInputLogin}
                /></p>
                <MyButton name={'Login'} method={changeOnR}/>
                <MyButton name={'Register'} method={changeOnR}/>
            </div>
        );
    } else if (LoginOrRegister === 1) {
        return (
            <div className={styles.bord}>
                <p>Name: <input
                    type="username"
                    id="username"
                    name="username"
                    value={register.username}
                    onChange={changeInputRegister}
                /></p>
                <p>Email: <input
                    type="email"
                    id="email"
                    name="email"
                    value={register.email}
                    onChange={changeInputRegister}
                    formNoValidate
                /></p>
                <p>Password: <input
                    type="password"
                    id="password"
                    name="password"
                    value={register.password}
                    onChange={changeInputRegister}
                /></p>
                <p>Repeat password: <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={register.password2}
                    onChange={changeInputRegister}
                /></p>
                <MyButton name={'Login'} method={changeOnL}/>
                <MyButton name={'Back to log main'} method={changeOnL}/>
            </div>
        );
    }
};

export default Test;