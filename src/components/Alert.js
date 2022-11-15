import React, { useEffect } from "react";

// import styles from './Alert.module.css';

const Alert = ({ alertInformation, alertDisplayHandler, list }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            alertDisplayHandler();
        }, 3000);
        
        return () => clearTimeout(timer);
    },[list]);
    
    return <div className="alert">{ alertInformation.message}</div>;
};

export default Alert;
