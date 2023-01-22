import React, {useEffect, useLayoutEffect, useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import styles from './TableData.module.css'
import MyButton from "../MyButton/MyButton";
import {render} from "react-dom";
import axios from "../../../axiosAPI";


const TableData = (props) => {
    const [data, setData] = useState([])

    useEffect(() => {
        reloadData()
    }, [props.resUpload])

    const columns = [{
        dataField: 'x',
        text: 'X'
    }, {
        dataField: 'y',
        text: 'Y'
    }, {
        dataField: 'r',
        text: 'R'
    }, {
        dataField: 'time',
        text: 'Time'
    }, {
        dataField: 'duration',
        text: 'Duration (мс)'
    }, {
        dataField: 'result',
        text: 'Result'
    },];

    useEffect(() => {
        reloadData();
    }, [])

    useEffect(() => {
        let newDot = {
            x: props.newUpload.x,
            y: props.newUpload.y,
            r: props.newUpload.r,
            time: props.newUpload.time,
            duration: props.newUpload.duration,
            result: props.newUpload.result ? "Попадание":"Промах"
        }
        console.log(newDot)
        setData([newDot, ...data ])
    }, [props.newUpload])


    function reloadData() {
        document.getElementById('midError').innerHTML = ""
        axios.get("/hit/get_all", {
                headers: {
                    'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                }
            }
        ).then(res => {
            let masData = [];
            for(let num in res.data.data){
                let newDot = {
                    x: res.data.data[num].coordinates.xvalue,
                    y: res.data.data[num].coordinates.yvalue,
                    r: res.data.data[num].coordinates.rvalue.toFixed(1),
                    time: res.data.data[num].currentTime,
                    duration: res.data.data[num].executionTime,
                    result: res.data.data[num].hitResult ? "Попадание":"Промах"
                }
                masData.unshift(newDot);
            }
            setData(masData)
        }).catch(error => {
            console.log(error)
            document.getElementById('midError').innerHTML = "There are problems on the server or your token has expired, try to re-login"
        })
    }



    return (
        <div>
            <BootstrapTable classes={styles.table} keyField='id' data={data} columns={columns}/>
        </div>
    )
};

export default TableData;