'use client'
import React from 'react'
import { createContext, useState } from 'react'
export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [userData, setUserData] = useState([]);
    const [navActives, setNavActives] = useState('');

    const addData = (newData) => {
        setUserData(newData);
        // setUserData([...userData, newData]);
    }
    const navActive = (navData) => {
        setNavActives(navData);
        // setUserData([...userData, newData]);
    }


  
    return (
        <PostContext.Provider value={{userData, addData,navActive,navActives}}>
            <div>{children}</div>
        </PostContext.Provider>
    )
}
