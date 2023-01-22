import React from 'react';
import styles from './MyButton.module.css';

const MyButton = ({name, method}) => {
    return (
        <button onClick={() => method()} className={styles.button}>
            {name}
        </button>
    );
};

export default MyButton;