import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../UI/button/MyButton";
import {AuthContext} from "../../context/context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className={'navbar'}>
            <MyButton onClick = {logout}>
                Log out
            </MyButton>
            <div className={'navbar__links'}>
                <Link to = '/posts'>Posts</Link>
                <Link to = '/about'>About</Link>
            </div>
        </div>
    );
};

export default Navbar;