import { Logo } from "./Logo";
import { useState } from "react";
import { SideBar } from "./SideBar";
import { Link } from "react-router-dom";
import { List, X } from 'phosphor-react';

export function Header() {

    let [isOpenSideBar, setIsOpenSideBar] = useState(false);

    return (
        <>
            <header className="w-full py-5 flex items-center justify-center bg-gray-700 border-b border-gray-500 lg:justify-around lg:fixed z-[999999]">
                <Link to="/">
                    <Logo />
                </Link>
                <div className="hidden lg:block">
                    { isOpenSideBar ? 
                        <X size={32} onClick={() => setIsOpenSideBar(!isOpenSideBar)}/> 
                        : 
                        <List size={32} onClick={() => setIsOpenSideBar(!isOpenSideBar)} /> 
                    } 
                </div>

                { isOpenSideBar ?  
                    <SideBar classe="fixed z-[99999] top-[75px] right-0 bg-gray-700 p-6 border-l border-gray-600 h-full transition-all duration-100"/> 
                    : 
                    <></>
                }
            </header>
        </>   
    )
} 