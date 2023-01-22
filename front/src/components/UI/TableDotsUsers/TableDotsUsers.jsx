import React, {useEffect, useState} from "react";
import axios from "../../../axiosAPI";
import BootstrapTable from "react-bootstrap-table-next";
import styles from "./TableDotsUsers.module.css";
import MyButton from "../MyButton/MyButton";

const TableDotsUsers = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        reloadDataDot()
    }, [])

    const columns = [{
        dataField: 'dotid',
        text: 'Dot id'
    }, {
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
        dataField: 'result',
        text: 'Result'
    }, {
        dataField: 'username',
        text: 'Username'
    }, {
        dataField: 'userid',
        text: 'User id'
    }, {
        dataField: 'button',
        text: ''
    }]

    const deleteDot = (id) => {

    }

    const reloadDataDot = () => {
        axios.get("/api/adm/get_all_dots", {
                headers: {
                    'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                }
            }
        ).then(res => {
            let masData = [];
            for(let num in res.data.data) {
                let newDot = {
                    dotid: res.data.data[num].id,
                    x: res.data.data[num].coordinates.xvalue,
                    y: res.data.data[num].coordinates.yvalue,
                    r: res.data.data[num].coordinates.rvalue.toFixed(1),
                    time: res.data.data[num].currentTime,
                    duration: res.data.data[num].executionTime,
                    result: res.data.data[num].hitResult ? "Попадание":"Промах",
                    username: res.data.data[num].user,
                    userid: res.data.data[num].idUser,
                    button: <MyButton name={"delete"} method={() => {
                        let dotid = res.data.data[num].id
                        console.log(dotid)
                        axios.post("/api/adm/delete_dot", {
                            id: dotid
                            },{
                                headers: {
                                    'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                                }
                            }
                        ).then(res => {
                            reloadDataDot()
                            }
                        ).catch(error => {
                            console.log(error)
                        })
                    }
                    }/>
                }
                masData.unshift(newDot);
            }
            setData(masData)
        }).catch(error => {
            alert(error)
            // document.getElementById('midError').innerHTML = "There are problems on the server or your token has expired, try to re-login"
        })
    }

    return(
        <div>
            <BootstrapTable classes={styles.table}  keyField={'dotid'} data={data} columns={columns}/>
        </div>
    )
}

export default TableDotsUsers;