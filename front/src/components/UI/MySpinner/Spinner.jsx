import React, {useState} from 'react';
import styles from './Spinner.module.css'
import MyButton from "../MyButton/MyButton";

export const validator = (a) => {
    return (a > -5) && (a <= 3);
}

const Spinner = (props) => {
    const [error, setError] = useState('');


    function setErrors(){
        setError(props.arg + ' must be in the range (-5 ... 3)');
    }

    function clearError(){
        setError('');
    }

    const increment1 = () => {
        if (validator(props.val + 1)) {
            clearError();
            props.setter(props.val + 1);
        } else {
            setErrors();
        }
    }

    const increment01 = () => {
        if (validator(props.val + 0.1)){
            clearError();
            props.setter(props.val + 0.1);
        } else {
            setErrors();
        }
    }
    const decrement1 = () => {
        if (validator(props.val - 1)) {
            clearError();
            props.setter(props.val - 1);
        } else {
            setErrors();
        }
    }

    const decrement01 = () => {
        if (validator(props.val - 0.1)) {
            clearError();
            props.setter(props.val - 0.1)
        } else {
            setErrors();
        }
    }

    return (
        <div>
            <h1>{props.arg + ':'}</h1>
            <div className={styles.spinner}>
                <MyButton name={'-0.1'} method={decrement01}/>
                <MyButton name={'-1'} method={decrement1}/>
                <h1 id={props.arg + 'Arg'} className={styles.number}>{props.val.toFixed(1)}</h1>
                <MyButton name={'+1'} method={increment1}/>
                <MyButton name={'+0.1'} method={increment01}/>
            </div>
            <h2 className={styles.error} id={props.arg + 'error'}>{error}</h2>

        </div>
    );
};

export default Spinner;