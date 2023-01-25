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
        axios.get("/api/auth/check", {
            headers: {
                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
            }
        }).then(res => {
            localStorage.setItem("username", res.data.username)
            localStorage.setItem("role", res.data.role)
        })
    }, [data])

    useEffect(() => {
        reloadData()
    }, [])

    function gvAdm(res, num) {
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

    function gvUser(res, num) {
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

    function delUser(res, num) {
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

    function createElements(res) {
        let masData = [];
        console.log(res.data.users)
        for (let num in res.data.users) {
            const {name: nameR, method: methodR} = getButtonRole(res, num);
            const {name: nameD, method: methodD} = getButtonDelete(res, num);
            let newUser = {
                id: res.data.users[num].id,
                username: res.data.users[num].username,
                role: res.data.users[num].role,
                buttonR: nameR && methodR ? <MyButton name={nameR} method={methodR}/> : <div/>,
                buttonD: nameD && methodD ? <MyButton name={nameD} method={methodD}/> : <div/>
            }
            masData.unshift(newUser);
        }
        setData(masData)
    }

    function getButtonRole(res, num) {
        switch (localStorage.getItem("role")) {
            case "ADMIN":
                if (res.data.users[num].role === "USER") {
                    return {
                        name: 'Give Admin',
                        method: (() => gvAdm(res, num))
                    }
                } else {
                    return {};
                }
            case "OWNER":
                if (res.data.users[num].role === "USER") {
                    return {
                        name: 'Give Admin',
                        method: (() => gvAdm(res, num))
                    }
                } else if (res.data.users[num].role === "ADMIN") {
                    return {
                        name: 'Take Admin',
                        method: (() => gvUser(res, num))
                    }
                } else {
                    return {};
                }
            default:
                return {};
        }
    }


    function getButtonDelete(res, num) {
        const bDel = {
            name: 'Delete',
            method: (() => delUser(res, num))
        }
        switch (localStorage.getItem("role")) {
            case "ADMIN":
                if (res.data.users[num].role === "USER" && localStorage.getItem("username") !== res.data.users[num]) {
                    return bDel;
                } else {
                    return;
                }
            case "OWNER":
                if (localStorage.getItem("username") !== res.data.users[num]) {
                    return bDel;
                } else {
                    return;
                }
            default:
                return;
        }
    }


    function reloadData() {
        axios.get("/api/adm/get_all_users", {
            headers: {
                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
            }
        }).then(res => {
            createElements(res)
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