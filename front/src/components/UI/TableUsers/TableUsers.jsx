import styles from "./TableUsers.module.css";
import BootstrapTable from "react-bootstrap-table-next";
import React, {useEffect, useRef, useState} from "react";
import axios from "../../../axiosAPI";
import MyButton from "../MyButton/MyButton";

const TableUsers = (props) => {

    const [data, setData] = useState([]);

    const columns = [{
        dataField: 'id',
        text: 'Id'
    }, {
        dataField: 'username',
        text: 'Username'
    }, {
        dataField: 'role',
        text: 'Role'
    }, {
        dataField: 'buttonD',
        text: ''
    }, {
        dataField: 'buttonR',
        text: ''
    }]

    useEffect(() => {
        reloadData()
        axios.get("/api/auth/check", {
            headers: {
                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
            }
        }).then(res => {
            localStorage.setItem("username", res.data.username)
            localStorage.setItem("role", res.data.role)
        })
    }, [])

    function reloadData() {
        document.getElementById('midError').innerHTML = ""
        axios.get("/api/adm/get_all_users", {
            headers: {
                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
            }
        }).then(res => {
            let masData = [];
            console.log(res.data.users)
            for (let num in res.data.users) {
                let newUser = {
                    id: res.data.users[num].id,
                    username: res.data.users[num].username,
                    role: res.data.users[num].role,
                    buttonR:
                        localStorage.getItem("role") === "ADMIN" ?
                            res.data.users[num].role === "USER" ? <MyButton name={'Give admin'} method={() => {
                                axios.post("api/adm/give_adm", {
                                    username: res.data.users[num].username
                                }, {
                                    headers: {
                                        'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                                    }
                                }).then(res => {
                                    reloadData()
                                }).catch(error => {
                                    console.log(error)
                                })
                            }
                            }/> : <div/> :
                            localStorage.getItem('role') === "OWNER" ?
                                res.data.users[num].role === "USER" ? <MyButton name={'Give admin'} method={() => {
                                        axios.post("api/adm/give_adm", {
                                            username: res.data.users[num].username
                                        }, {
                                            headers: {
                                                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                                            }
                                        }).then(res => {
                                            reloadData()
                                        }).catch(error => {
                                            console.log(error)
                                        })
                                    }
                                    }/> :
                                    res.data.users[num].role === "ADMIN" ? <MyButton name={'Take admin'} method={() => {
                                        axios.post("api/adm/give_user", {
                                            username: res.data.users[num].username
                                        }, {
                                            headers: {
                                                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                                            }
                                        }).then(res => {
                                            reloadData()
                                        }).catch(error => {
                                            console.log(error)
                                        })
                                    }
                                    }/> : <div/> :
                                <div/>,
                    buttonD:
                        res.data.users[num].role !== "OWNER" ?
                            localStorage.getItem("role") === "OWNER" ?
                                localStorage.getItem("username") !== res.data.users[num] ?
                                    <MyButton name={"delete"} method={() => {
                                        let username = res.data.users[num].username
                                        axios.post("/api/adm/delete_user", {
                                                username: username
                                            }, {
                                                headers: {
                                                    'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                                                }
                                            }
                                        ).then(res => {
                                                reloadData()
                                            }
                                        ).catch(error => {
                                            console.log(error)
                                        })
                                    }
                                    }/> : <div/> : localStorage.getItem("role") === "ADMIN" ?
                                    res.data.users[num].role === "USER" && localStorage.getItem("username") !== res.data.users[num] ?
                                        <MyButton name={"delete2"} method={() => {
                                            let username = res.data.users[num].username
                                            console.log(username)
                                            axios.post("/api/adm/delete_user", {
                                                    username: username
                                                }, {
                                                    headers: {
                                                        'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
                                                    }
                                                }
                                            ).then(res => {
                                                    reloadData()
                                                }
                                            ).catch(error => {
                                                console.log(error)
                                            })
                                        }
                                        }/> : <div/> : <div/> : <div/>
                }
                console.log(localStorage.getItem("username"))
                masData.unshift(newUser);
            }
            console.log("masData")
            setData(masData)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <BootstrapTable classes={styles.table} keyField={'id'} data={data} columns={columns}/>
        </div>
    )
}

export default TableUsers;