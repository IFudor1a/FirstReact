import React, {useContext} from 'react';
import Navbar from "./Navbar/Navbar";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes/router";
import {AuthContext} from "../context/context";
import Loader from "./UI/Loader/Loader";



const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)
    if(isLoading) {
        return <Loader />
    }
    return (
        <BrowserRouter>
            <Navbar />
            {isAuth?
            <Routes>
                {privateRoutes.map(route =>
                        <Route element={<route.element/>} path={route.path} key={route.path}/>
                    )}
            </Routes>:
                <Routes>
                    {publicRoutes.map(route =>
                    <Route element={<route.element/>} path={route.path} key={route.path}/>
                    )}

            </Routes>
            }
        </BrowserRouter>
    );
}

export default AppRouter;