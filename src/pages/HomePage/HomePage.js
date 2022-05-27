import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import debounce from "lodash.debounce"

import {
    fetchTransaction,
    getAllTransactions,
    getListUsers
} from "store/transactionReduser/transactionThunk/transactionThunk";
import { getUserInfoData } from "store/userReduser/thunk";
import getUserInfo from "store/userReduser/getterUserInfo";
import getUser from "store/transactionReduser/transactionThunk/getterUser";
import TransactionList from "components/TransactionList";
import Menu from "components/Menu/Menu";
import UserInfo from "pages/HomePage/UserInfo";
import gifLoad from "assetc/gifLoad.gif";
import classes from "pages/HomePage/homePage.module.css";

const ITEMS_PER_PAGE = 8

const HomePage = () => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [recipientId, setRecipientId] = useState()
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const dispatch = useDispatch()
    const {usersList} = useSelector(getUser)
    const {user} = useSelector(getUserInfo)
    const {transactionList} = useSelector(getUser)
    const {isLoading} = useSelector(getUser)

    const userInfo = {
        name: name,
        amount: amount,
        recipientId: recipientId,
        correspondentId: user.id,
    }

    const handleChangeAmount = (event) => {
        const text = event.target.value
        setAmount(text)
    }

    const userName = (userListName) => {
        setName(userListName)
    }

    const onInputChange = ({target}) => {
        setName(target.value);
        setRecipientId(null);
    }

    const requestTransaction = () => {
        dispatch(fetchTransaction(userInfo))
        setAmount('')
        setName('')
    }

    const setButtonState = () => {
        if (!name) return true
        if (!amount) return true
        if (amount <= 0 || amount > user.balance) return true
        if (!recipientId) return true
    }

    const retryTransaction = async (item) => {
        const {recipient_id, amount, name} = item;
        const infoUser = {
            name: name,
            amount: amount,
            recipientId: recipient_id,
            correspondentId: user.id,
        }
        dispatch(fetchTransaction(infoUser))
    }

    useEffect(() => {
        setButtonState()
    }, [recipientId, name, amount])

    useEffect(() => {
        if (name.length >= 3) {
            debounce(() => dispatch(getListUsers(name)), 500)
        }
    }, [name])

    useEffect(() => {
        dispatch(getUserInfoData())
    }, [])

    useEffect(() => {
        dispatch(getAllTransactions())
    }, [])

    useEffect(() => {
        const endOffset = itemOffset + ITEMS_PER_PAGE;
        setCurrentItems(transactionList.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(transactionList.length / ITEMS_PER_PAGE));
    }, [itemOffset, ITEMS_PER_PAGE, transactionList]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * ITEMS_PER_PAGE) % transactionList.length;
        setItemOffset(newOffset);
    };

    return (
        <div className={classes.userPage}>
            <div className={classes.userPage_header}>
                <h1>GSY TRANSACTION</h1>
                <h2>fast and convenient translation application</h2>
            </div>
            <div className={classes.content}>
                <div className={classes.topLine}>
                    <div className={classes.topLine_Content}>
                        <div className={classes.transactionField}>
                            <Menu name={name}
                                  userName={userName}
                                  usersList={usersList}
                                  recipientId={setRecipientId}
                                  onChange={onInputChange}/>
                            <input
                                type='number'
                                placeholder='sum'
                                className={classes.formBoxInputSum}
                                value={amount}
                                onChange={handleChangeAmount}
                            />
                            {isLoading ?
                                <div className={classes.skeletonTransactionButton}>
                                    <img src={gifLoad} alt="Загрузка" className={classes.gif}/>
                                </div> :
                                <button type="submit"
                                        disabled={setButtonState()}
                                        onClick={requestTransaction}
                                        className={classes.transactionButton}>
                                    AMOUNT Transaction
                                </button>
                            }

                        </div>
                    </div>
                    <UserInfo user={user}/>
                </div>
                <div className={classes.transactionList}>
                    <TransactionList transactionList={currentItems}
                                     retryTransaction={retryTransaction}
                                     isLoading={isLoading}
                    />
                    <ReactPaginate
                        className={classes.pagesContainer}
                        pageClassName={classes.pageItemBlock}
                        activeClassName={classes.pageItemBlock + ' ' + classes.activeList}
                        breakClassName={classes.pageItemBlock}
                        previousClassName={classes.pageItemBlock}
                        nextClassName={classes.pageItemBlock}
                        breakLabel="..."
                        nextLabel=">>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<<"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
