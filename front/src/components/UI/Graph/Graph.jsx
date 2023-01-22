import React, {useEffect, useState} from 'react';
import styles from "./Graph.module.css"
import MyButton from "../MyButton/MyButton";
import axios from "../../../axiosAPI";
import logout from "../Header/Logout/Logout";


const Graph = (props) => {
    const [dots, setDots] = useState([])

    useEffect(() => {
        deleteDots()
    }, [props.resUpload])
    
    useEffect(() => {
        updateGraph()
        reloadDots()
        deleteDots()
    },[props.valR])

    function updateGraph(){
        let rArg = props.valR;
        console.log(rArg);
        let offset = 30*rArg;
        let hOffset = offset/2;
        let absOffset = Math.abs(offset);
        let dForCircle = 'M 200,' + (200+(+offset)) + ' A ' + absOffset + ',' + absOffset + ' 90 0,1 ' + (200 - offset) + ',200' + ' L 200,200 Z';
        let dForTrigle = '200,200 200,' + (200 + offset) + ' ' + (200 + hOffset) + ',200';
        console.log(dForCircle);
        document.getElementById('trigle').setAttribute('points', dForTrigle)
        document.getElementById('circle').setAttribute('d', dForCircle)
        let square = document.getElementById('square');
        square.setAttribute('x', 200);
        square.setAttribute('y', 200 - offset);
        square.setAttribute('width', absOffset/2);
        square.setAttribute('height', absOffset);
        if(rArg < 0){
            square.setAttribute('y', 200);
            square.setAttribute('x', 200 + hOffset);
        }
    }

    const shotValidate = (xv, yv, r) =>{
        let x = (+xv - 200) / 30
        let y = (200 - yv) / 30
        if(x <= 0 && y <= 0){
            if(x*x + y*y <= r*r)return true
            return false
        }else if(x >= 0 && y >= 0){
            if(x <= r/2 && y <= r)return true
            return false
        }else if(x >= 0 && y <= 0){
            if(y >= 2*x - r) return true
            return false
        }
        return false;
    }

    const deleteDots = () =>{
        let dots = document.getElementById('dot');
        if (dots == null) {
        } else {
            while (dots != null) {
                dots.remove();
                dots = document.getElementById('dot');
            }
        }
    }

    const printDot = (x, y) => {
        let xc = +x
        let yc = +y
        let color;
        if(shotValidate(x, y, props.valR)){
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

    useEffect(() => {
        reloadDots();
    }, [])

    const reloadDots = () => {
        document.getElementById('midError').innerHTML = ""
        axios.get("/hit/get_all", {
                headers: {
                    'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                }
            }
        ).then(res => {
            let masDot = [];
            for(let num in res.data.data){
                let newDot = {
                    id: +num + 1,
                    x: res.data.data[num].coordinates.xvalue,
                    y: res.data.data[num].coordinates.yvalue,
                    r: res.data.data[num].coordinates.rvalue.toFixed(1),
                }
                masDot.unshift(newDot);
                let x = ((+res.data.data[num].coordinates.xvalue * 30) + 200).toFixed(2)
                let y = (((+res.data.data[num].coordinates.yvalue * -30) + 200).toFixed(2))
                printDot(x, y)
            }
            setDots(masDot)
        }).catch(error => {
            alert(error)
            console.log(error)
            document.getElementById('midError').innerHTML = "There are problems on the server or your token has expired, try to re-login"
        })
    }

    const shot = (event) => {
        document.getElementById('midError').innerHTML = ""
        let xv = event.nativeEvent.offsetX
        let xy = event.nativeEvent.offsetY
        let x = ((xv - 200) / 30).toFixed(2)
        let y = (((xy - 200) * (-1)) / 30).toFixed(2)
        axios.post("/hit/add", {
            xValue: x,
            yValue: y,
            rValue: props.valR
        }, {
            headers: {
                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
            }
        }).then(res => {
            printDot(xv, xy)
            let newD = {
                x: res.data.data[0].coordinates.xvalue,
                y: res.data.data[0].coordinates.yvalue,
                r: res.data.data[0].coordinates.rvalue.toFixed(1),
                time: res.data.data[0].currentTime,
                duration: res.data.data[0].executionTime,
                result: res.data.data[0].hitResult
            }
            props.setUpload(newD)
        }).catch( error => {
            document.getElementById('midError').innerHTML = "There are problems on the server or your token has expired, try to re-login"
        })
    }

    return (
        <div id="graph">
            <svg id="svg" className={styles.graph} height="400" width="400" xmlns="http://www.w3.org/2000/svg"
                 onClick={shot}>

                <polygon points="200,200 200,230 215,200" fillOpacity="0.4" stroke="black"
                         fill="pink" id={'trigle'}/>
                <path d="M 200,230 A 30,30 90 0,1 170,200 L 200,200 Z" fillOpacity="0.4" stroke="black"
                      fill="yellow" id={'circle'}/>
                <rect x="200" y="80" width=" 60" height="120" fillOpacity="0.4" stroke="black"
                      fill="orange" id={'square'}/>

                <line stroke="black" x1="0" x2="400" y1="200" y2="200"/>
                <line stroke="black" x1="200" x2="200" y1="0" y2="400"/>

                <polygon fill="black" stroke="black" points="200,0 195,10 205,10"/>
                <polygon fill="black" stroke="black" points="400,200 390,195 390,205"/>

                <line stroke="black" x1="50" x2="50" y1="197" y2="203"/>
                <line stroke="black" x1="80" x2="80" y1="197" y2="203"/>
                <line stroke="black" x1="110" x2="110" y1="197" y2="203"/>
                <line stroke="black" x1="140" x2="140" y1="197" y2="203"/>
                <line stroke="black" x1="170" x2="170" y1="197" y2="203"/>

                <line stroke="black" x1="230" x2="230" y1="197" y2="203"/>
                <line stroke="black" x1="260" x2="260" y1="197" y2="203"/>
                <line stroke="black" x1="290" x2="290" y1="197" y2="203"/>
                <line stroke="black" x1="320" x2="320" y1="197" y2="203"/>
                <line stroke="black" x1="350" x2="350" y1="197" y2="203"/>

                <line stroke="black" x1="197" x2="203" y1="50" y2="50"/>
                <line stroke="black" x1="197" x2="203" y1="80" y2="80"/>
                <line stroke="black" x1="197" x2="203" y1="110" y2="110"/>
                <line stroke="black" x1="197" x2="203" y1="140" y2="140"/>
                <line stroke="black" x1="197" x2="203" y1="170" y2="170"/>

                <line stroke="black" x1="197" x2="203" y1="230" y2="230"/>
                <line stroke="black" x1="197" x2="203" y1="260" y2="260"/>
                <line stroke="black" x1="197" x2="203" y1="290" y2="290"/>
                <line stroke="black" x1="197" x2="203" y1="320" y2="320"/>
                <line stroke="black" x1="197" x2="203" y1="350" y2="350"/>
            </svg>
        </div>
    );
}

export default Graph;