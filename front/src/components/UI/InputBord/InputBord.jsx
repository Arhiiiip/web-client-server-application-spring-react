import React, {useEffect, useState} from 'react';
import Spinner from "../MySpinner/Spinner";
import styles from "./InputBord.module.css"
import MyButton from "../MyButton/MyButton";
import SpinnerR from "../MySpinner/SpinnerR";
import axios from "../../../axiosAPI";

const InputBord = (props) => {

    const [valX, setValX] = useState(0);
    const [valY, setValY] = useState(0);

    const printDot = (x, y, result) => {
        let xc = (+x * 30) + 200
        let yc = (+y * -30) + 200
        let color;
        if(result){
            color = "green"
        }else{
            color = "red"
        }
        const shoot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        shoot.setAttribute('r', '4');
        shoot.setAttribute('cx', String(xc));
        shoot.setAttribute('cy', String(yc));
        shoot.setAttribute('fill', color);
        shoot.setAttribute('color', color);
        shoot.setAttribute('id', 'dot');
        shoot.setAttribute('class', 'dot');

        let pole = document.getElementById('svg');
        pole.appendChild(shoot);
    }




    const shoot = () => {
        document.getElementById('midError').innerHTML = ""
        axios.post("/hit/add", {
          xValue: valX,
          yValue: valY,
          rValue: props.valR
        }, {
            headers: {
                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
            }
        }).then(res => {
            printDot(valX, valY, res.data.data[0].hitResult)
            let newD = {
                x: res.data.data[0].coordinates.xvalue,
                y: res.data.data[0].coordinates.yvalue,
                r: res.data.data[0].coordinates.rvalue,
                time: res.data.data[0].currentTime,
                duration: res.data.data[0].executionTime,
                result: res.data.data[0].hitResult
            }
            props.setUpload(newD)
        }).catch(error => {
            document.getElementById('midError').innerHTML = "There are problems on the server or your token has expired, try to re-login"
        })
    }

    const reset = () => {
        document.getElementById('midError').innerHTML = ""
        axios.get("/hit/remove_all", {
        headers: {
            'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
        }
        }).then(() => {
            props.setResUpload(!props.resUpload)
        }).catch(() => {
        document.getElementById('midError').innerHTML = "There are problems on the server or your token has expired, try to re-login"
    })

    }

    return (
        <div className={styles.bord}>
            <Spinner val={valX} setter={setValX} arg={'X'}/>
            <Spinner val={valY} setter={setValY} arg={'Y'}/>
            <SpinnerR valR={props.valR} mValR={props.mValR} arg={'R'}/>
            <div className={styles.shootReset}>
                <MyButton name={'Shoot'} method={shoot}/>
                <br/>
                <MyButton name={'Reset'} method={reset}/>
            </div>
        </div>
    );
};

export default InputBord;