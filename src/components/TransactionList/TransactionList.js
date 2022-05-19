import React, { useEffect, useState } from 'react';

import gifLoad from "assetc/gifLoad.gif"
import classes from "components/TransactionList/TransactionList.module.css";

const TransactionList = ({transactionList, retryTransaction, isLoading}) => {

    const [additionalInfo, setAdditionalInfo] = useState(null)

    const handleClick = (item) => {
        retryTransaction(item)
    }

    useEffect(() => {
        if (window.innerWidth < 850) {
            setAdditionalInfo(true)
        } else setAdditionalInfo(false)
    }, [window.innerWidth])

    return (
        <div className={classes.transactionTable}>
            {transactionList.length > 0 &&
            <div className={classes.topLineTable}>
                <div className={classes.item}>Name</div>
                <div className={classes.item}>Date/Time of the transaction</div>
                <div className={classes.item}>Transaction amount,<br/>
                    (Debit/Credit for PW transferred)
                </div>
                <div className={classes.item}>Balance</div>
                <div className={classes.item}>Retry transaction</div>
            </div>
            }
            {transactionList.map(item => (
                <div className={classes.transactionElement} key={item.id}>
                    <div className={classes.item}>{additionalInfo ? 'Name: ' + item.name : item.name}</div>
                    <div className={classes.item}>{additionalInfo ? 'Date/Time of the transaction : ' + item.date : item.date}</div>
                    <div className={classes.item}>{additionalInfo ? 'Transaction amount (Debit/Credit for PW transferred) : ' + item.amount : item.amount}</div>
                    <div className={classes.item}>{additionalInfo ? 'Balance: ' + item.balance : item.balance}</div>
                    <div className={classes.item}>
                        {isLoading ?
                            <div className={classes.skeletonTransactionButton}>
                                <img src={gifLoad} alt="Загрузка" className={classes.gif}/>
                            </div> :
                            <button className={classes.retryTransactionButton}
                                    onClick={() => handleClick(item)}>
                                Retry
                            </button>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
