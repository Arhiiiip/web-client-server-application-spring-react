import React, {useState} from 'react';
import styles from "./AuthBord.module.css";
import MyButton from "../../MyButton/MyButton";
import axios from "../../../../axiosAPI";

function validatorPassword(password){
    const passwordRegexp = new RegExp(
        /\w{7,}$/
    )
    return passwordRegexp.test(password)
}

function validatorName(name){
    const nameRegexp = new RegExp(
        /\w{4,14}$/
    )
    return nameRegexp.test(name)
}


const AuthBord = (props) => {

    const [LoginOrRegister, setLorR] = useState(0);
    const [register, setRegister] = useState(() => {
        return {
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

    const registering = event => {
        document.getElementById('midError').innerHTML = ""
        props.setAdmin(false)
        if (!validatorName(register.username)) {
            document.getElementById('midError').innerHTML = "The length of the name must be between 4 and 18 characters"
        } else if (register.password !== register.password2) {
            document.getElementById('midError').innerHTML = "Repeated password incorrectly"
        } else if (!validatorPassword(register.password)) {
            document.getElementById('midError').innerHTML =  "The password must be at least 7 characters long"
        } else {
            axios.post("/api/auth/register", {
                username: register.username,
                password: register.password,
            }).then(res => {
                if(res.data.token !== null){
                    localStorage.setItem('token', res.data.token)
                    props.setLog('mid')
                }else{
                    document.getElementById('midError').innerHTML =  "not reg"
                }


            }).catch(() => {
                document.getElementById('midError').innerHTML = "An error occurred on the server"
            })
        }
    }

    const logining = event => {
        document.getElementById('midError').innerHTML = ""
        props.setAdmin(false)
        if (!validatorName(login.emailOrUsername) || !validatorPassword(login.password)) {
            document.getElementById('midError').innerHTML = "Email or password not valid"
        } else {
            axios.post("/api/auth/login", {
                username: login.emailOrUsername,
                password: login.password,
            }).then(res => {
                if(res.data.token !== null){
                    localStorage.setItem('token', res.data.token);
                    props.setLog('mid')
                    if(res.data.role === "ADMIN" || res.data.role === "OWNER"){
                        props.setAdmin(true);
                    }
                }else{
                    document.getElementById('midError').innerHTML =  "Name or password not valid, its trouble"
                }
            }).catch(() => {
                document.getElementById('midError').innerHTML = "An error occurred on the server"
            })
        }
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
                <p>Name or Mail: <input
                    type="emailOrUsername"
                    id="emailOrUsername"
                    name="emailOrUsername"
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
                <MyButton name={'Login'} method={logining}/>
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
                <MyButton name={'Register'} method={registering}/>
                <MyButton name={'Back to log main'} method={changeOnL}/>
            </div>
        );
    }
};

export default AuthBord;