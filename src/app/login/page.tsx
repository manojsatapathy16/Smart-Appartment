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


const Login = () => {
    const { userData, addData } = useContext(PostContext);
    const [employeeid, setEmployeeid] = useState('a@gmail.com'); //01SC370
    const [password, setPassword] = useState('Abc@1234'); //suyog2022**
    const [loader, setLoader] = useState(false);
    const [checksave, setCheckSave] = useState(false);
    const [passwordType, setPasswordType] = useState(false);


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
            if (employeeid == ''||employeeid == undefined) {
                alert('Please Enter Your Username');
                return;
            }
            if (password == ''||password == undefined) {
                alert('Please Enter Your Password');
                return;
            }
            // Encode the String

            // Decode the String
            // var decodedString = Base64.decode(encodedString);
            // console.log(decodedString);
            //Login Start

            // let encodedString = Base64.encode(password);

            let formdata = new FormData();
            setLoader(true);

            // let device_id = await DeviceInfo.getUniqueId();

            // let checkToken = await AsyncStorage.getItem('fcmToken');

            formdata.append('id', employeeid);
            formdata.append('psw', password);
            // formdata.append('device_id', device_id);
            // formdata.append('device_token', checkToken);

            await axios.post(APIS.LOGIN, formdata).then(({ data }) => {
                if (data.status) {
                    console.log(data, 'hiii')
                 
                    setLoader(false);
                    
                    if (data.user_type == 'aprt') {

                        // router.push('/appointmentList')
                        // router.push({
                        //     pathname: '/appointmentList',
                        //     query: { data },
                        //   });
                        localStorage.setItem('authorization', data.user_type)
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('userName', data.name)
                        localStorage.setItem('userImage', data.img)
                        let empData = {
                            id: employeeid,
                            psw: password,
                        };
                        localStorage.setItem('empData', JSON.stringify(empData));
                        router.push('appartmentModule/guests');
                        addData(data);
                    } else if (data.user_type == 'cus') {

                        // router.push('/appointmentList')
                        // router.push({
                        //     pathname: '/appointmentList',
                        //     query: { data },
                        //   });
                        localStorage.setItem('authorization', data.user_type)
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('userName', data.name)
                        localStorage.setItem('userImage', data.img)
                        let empData = {
                            id: employeeid,
                            psw: password,
                        };
                        localStorage.setItem('empData', JSON.stringify(empData));
                        router.push('rentedCustomerModule/guests');
                        addData(data);
                    }
                    else {
                        alert('You are not authorized!')
                    }


                    //     if (checksave) {
                    //     let empData = {
                    //         id: employeeid,
                    //       psw: password,
                    //     };
                    //      localStorage.setItem('empData', JSON.stringify(empData));


                    //   } else {
                    //      localStorage.removeItem('empData');
                    //   }

                    // router.replace('./')

                } else {
                    alert(data.msg);
                }

            })
        }
        catch (err) {
            console.log(err);
            router.replace('./')
        }


        // props.userlogin(formdata, async (success, error, data) => {
        //   setLoader(false);
        //   if (error) {
        //     console.log(error, 'Error Login ');
        //   } else {
        //     console.log('Success', data.message);
        //     if (data.status === 1) {

        //       if (checksave) {
        //         let empData = {
        //           employee_id: employeeid.toUpperCase(),
        //           password: password,
        //         };
        //         await localStorage.setItem('empData', JSON.stringify(empData));
        //       } else {
        //         await localStorage.removeItem('empData');
        //       }

        //     } else {

        //     }
        //   }
        // });
    };
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
                                    <button onClick={onLogin} className="btn_login">
                                        Login
                                    </button>
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
