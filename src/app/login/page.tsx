"use client";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { PostContext } from '@/context/DataContext';
import "./style.css";
// import { useRouter } from 'next/router'
import { redirect } from 'next/navigation';
import Image from 'next/image'
import logo from '../../../public/LOGO_SMS.png';

import axios from 'axios';
import { APIS } from "@/NetworkConroller";
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast';
import { storeuser } from "@/Redux/Reducers/userSlice";
import { useDispatch } from "react-redux";


const Login = () => {
    const dispatch = useDispatch();
    const { userData, addData } = useContext(PostContext);
    const [employeeid, setEmployeeid] = useState('a@gmail.com'); //01SC370
    const [password, setPassword] = useState('Abc@1234'); //suyog2022**
    const [loader, setLoader] = useState(false);
    const [checksave, setCheckSave] = useState(false);
    const [passwordType, setPasswordType] = useState(false);
    // const [actionMessage, setActionMessage] = useState<any>();
    // const [showMessage, setShowMessage] = useState(false);

console.log(userData,'context data after login')
    const router = useRouter()
    useEffect(() => {
        getEmpData();
    }, []);
    const getEmpData = async () => {
        let data: any = localStorage.getItem('empData');
        let dataJsonParse = JSON.parse(data);

        if (data) {
            setEmployeeid(dataJsonParse.employee_id);
            setPassword(dataJsonParse.password);
            setCheckSave(true);
        }
    };

    const handleChange = () => {
        setCheckSave(!checksave)
    }

    const onLogin = async () => {
        try {
            if (employeeid == '' || employeeid == undefined) {
                alert('Please Enter Your Username');
                return;
            }
            if (password == '' || password == undefined) {
                alert('Please Enter Your Password');
                return;
            }
            let formdata = new FormData();
            setLoader(true);
            formdata.append('id', employeeid);
            formdata.append('psw', password);
            await axios.post(APIS.LOGIN, formdata).then(({ data }) => {
                if (data.status) {
                    console.log(data, 'hiii')
                    storeUser(data)
                    setLoader(true);

                    if (data.user_type == 'aprt') {
                        if (typeof window !== 'undefined') {
                            // Perform localStorage action
                            localStorage.setItem('authorization', data.user_type)
                            localStorage.setItem('token', data.token)
                            localStorage.setItem('userName', data.name)
                            localStorage.setItem('userImage', data.img)
                            localStorage.setItem('path', '/home/appartment')
                          }
                          
                       
                        let empData = {
                            id: employeeid,
                            psw: password,
                        };
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('empData', JSON.stringify(empData));
                        }
                       
                        setLoader(false);
                        router.push('home/appartment/guests');
                        addData(data);
                    } else if (data.user_type == 'cus') {
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('authorization', data.user_type)
                            localStorage.setItem('token', data.token)
                            localStorage.setItem('userName', data.name)
                            localStorage.setItem('userImage', data.img)
                            localStorage.setItem('path', '/home/customer')
                        }
                       
                        let empData = {
                            id: employeeid,
                            psw: password,
                        };
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('empData', JSON.stringify(empData));
                        }
                        
                        setLoader(false);
                        router.push('home/customer/guests');
                        addData(data);
                    }
                    else {
                        toast.error('You are not authorized!');
                        setLoader(false);
                    }

                } else {
                    toast.error(data.msg);
                    setLoader(false);
                }

            })
        }
        catch (err: any) {
            console.log(err);
            toast.error(err);
            setLoader(false);
            router.push('./')
        }
    };

    const storeUser=(data:any)=>{
        dispatch(storeuser(data));
      }
    const togglePasswordType = (type: boolean) => {
        {
            setPasswordType(type)
        }
    }
    return (
        <div>
            <div className="login_wrapper">

                <div className="login_bg">
                    <div className="login_container">
                        <div className="login_container_img">
                            <div className="bg_img">
                                <div> <Image src={logo} alt={"Menu"} /></div>

                            </div>
                        </div>
                        <div className="login_container_inputs">
                            <div className="login_container_items">
                                <span className="title_">
                                    Login
                                </span>
                                <div className="inputs">
                                    <input value={employeeid} onChange={(e) => setEmployeeid(e.target.value)} type="text" placeholder="Email" />
                                    <div className="password_field">
                                        {passwordType ? <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" /> : <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />}

                                        {/* {passwordType?<VisibilityOutlinedIcon onClick={()=>togglePasswordType(false)}/>:<VisibilityOffOutlinedIcon onClick={()=>togglePasswordType(true)}/>} */}

                                    </div>

                                </div>
                                <div style={{ paddingRight: 20, paddingLeft: 20 }}>

                                    Remember me.
                                </div>

                                <div className="subtim_login">
                                    {loader ? <button onClick={onLogin} className="btn_login disable">
                                        {loader ? <span className="spinner_button"> <i className="fa fa-spinner fa-spin"></i></span> : null} Login
                                    </button> : <button onClick={onLogin} className="btn_login">
                                        {loader ? <span className="spinner_button"> <i className="fa fa-spinner fa-spin"></i></span> : null} Login
                                    </button>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};
export default Login;
