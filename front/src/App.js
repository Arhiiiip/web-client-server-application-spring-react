import React, {useEffect, useState} from 'react';
import styles from "./App.module.css"
import MyHeader from "./components/UI/Header/MyHeader";
import InputBord from "./components/UI/InputBord/InputBord";
import MyFooter from "./components/UI/Footer/MyFooter";
import Graph from "./components/UI/Graph/Graph";
import TableData from "./components/UI/TableData/TableData";
import AuthBord from "./components/UI/AuthContents/AuthBord/AuthBord";
import Test from "./components/UI/AuthContents/AuthBord/test";
import axios from "./axiosAPI";
import MyButton from "./components/UI/MyButton/MyButton";
import AdminPanel from "./components/UI/AdminPanel/AdminPanel";

function App() {
    const [valR, setValR] = useState(5);
    const [map, setMap] = useState("log");
    const [isAdmin, setIsAdmin] = useState(false);
    const [resUpload, setResUpload] = useState(false);
    const [username, setUsername] = useState("");
    const [newUpload, setNewUpload] = useState(() => {
        return {
            x: "",
            y: "",
            r: "",
            time: "",
            duration: "",
            result: "",
        }
    })
    const [] = useState("");

    useEffect(() => {
        axios.get("/api/auth/check", {
            headers: {
                'Authorization': 'Bearer_'.concat(localStorage.getItem('token'))
            }
        }).then(res => {
            setMap('mid')
            setUsername(res.data.username)
            if(res.data.role === "ADMIN" || res.data.role === "OWNER"){
                setIsAdmin(true);
            }
        }).catch(() => {
            setMap('log')
        })}, [])

    // useEffect(() => {
    //     axios.post("/api/auth/register", {
    //         let jwtdf = localStorage.getItem();
    //     }).then(res => {
    //
    //     }).catch(() => {
    //         alert("An error occurred on the server")
    //     })
    // },[])

    // eslint-disable-next-line default-case
    switch (map){
        case "log":
            return(
                <div className={styles.appReg}>
                    <MyHeader isLog={map} setLog={setMap}/>
                    <div id={'midError'} className={styles.error}/>
                    <AuthBord setAdmin={setIsAdmin} setLog={setMap}/>
                </div>
            )
        case "mid":
            return (
                <div className={styles.appShootD}>
                    <MyHeader isLog={map} isAdmin={isAdmin}  setLog={setMap}/>
                    <div id={'midError'} className={styles.error}></div>
                    <Graph setUpload={setNewUpload} resUpload={resUpload} valR={valR}/>
                    <InputBord setUpload={setNewUpload} resUpload={resUpload} setResUpload={setResUpload} valR={valR} mValR={setValR}/>
                    <TableData newUpload={newUpload} resUpload={resUpload}/>
                </div>
            )
        case "god":
            return(
                <div className={styles.appAdm}>
                    <MyHeader isAdmin={isAdmin} setLog={setMap}/>
                    <AdminPanel/>
                </div>
            )
    }
    // if(map === "mid") {
    //     return (
    //         <div className={styles.appShootD}>
    //             <MyHeader isLog={map} isAdmin={isAdmin}  setLog={setMap}/>
    //             <div id={'midError'} className={styles.error}></div>
    //             <Graph setUpload={setNewUpload} resUpload={resUpload} valR={valR}/>
    //             <InputBord setUpload={setNewUpload} resUpload={resUpload} setResUpload={setResUpload} valR={valR} mValR={setValR}/>
    //             <TableData newUpload={newUpload} resUpload={resUpload} />
    //         </div>
    //     )
    // } else if (map === "log"){
    //     return(
    //         <div className={styles.appReg}>
    //             <MyHeader isLog={map} setLog={setMap}/>
    //             <div id={'midError'} className={styles.error}/>
    //             <AuthBord setAdmin={setIsAdmin} setLog={setMap}/>
    //         </div>
    //     )
    // }
}

export default App;
