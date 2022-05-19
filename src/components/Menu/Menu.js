import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";

import classes from "components/Menu/Menu.module.css";

const Menu = ({onChange, name, userName, usersList, recipientId}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    Menu.handleClickOutside = () => setIsOpen(false);

    return (
        <li className={isOpen ? classes.menu + ' ' + classes.active : classes.menu} onClick={toggle}>
            <input type={'text'} className={classes.formBoxInputName} placeholder="recipient" onChange={onChange}
                   value={name}/>
            <ul className={classes.menu__list}>
                {usersList.length > 0 ? usersList.map(item => (
                    <li key={item.id}>
                        <div className={classes.d} onClick={() => {
                            userName(item.name);
                            recipientId(item.id);
                        }}>{item.name}</div>
                    </li>

                )) : (<div>No options</div>)}
            </ul>
        </li>
    );
};

const clickOutsideConfig = {
    handleClickOutside: () => Menu.handleClickOutside
};
Menu.prototype = {}

export default onClickOutside(Menu, clickOutsideConfig);
