import styles from "./AdminPanel.module.css"
import {useEffect, useState} from "react";
import TableDotsUsers from "../TableDotsUsers/TableDotsUsers";
import TableUsers from "../TableUsers/TableUsers";
import MyButton from "../MyButton/MyButton";

const AdminPanel = (props) => {
    const [page, setPage] = useState("user")

    const toUsers = () => {
        setPage("user")
    }

    const toDots = () => {
        setPage("dots")
    }

    // eslint-disable-next-line default-case
    switch (page) {
        case "user":
            return (
                <div className={styles}>
                    <MyButton name={"Dots table"} method={toDots}/>
                    <TableUsers/>
                </div>
            )
        case "dots":
            return (
                <div>
                    <MyButton name={"Users table"} method={toUsers}/>
                    <TableDotsUsers/>
                </div>
            )
    }
}

export default AdminPanel;