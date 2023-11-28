"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import logo from '../../../public/LOGO_SMS.png';
import { useContext, useState } from "react";
import { PostContext } from '@/context/DataContext';
import { clear } from "@/Redux/Reducers/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Header(props: any) {
    const dispatch = useDispatch();
    const userData = useSelector((state: any) => state.userdata);
    const { navActive, navActives } = useContext(PostContext);
    const [activeClass, setActiveClass] = useState<any>(navActives)
    let userName: any = userData?.user_data?.name;
    let userImage: any = userData?.user_data?.img;
    let navPath: any = userData.path;
    console.log(userData?.user_data?.user_type, 'user type header');
    const router = useRouter();
    const Logout = () => {
        // localStorage.removeItem('empData');
        // localStorage.removeItem('userImage');
        // localStorage.removeItem('userName');
        // localStorage.removeItem('authorization');
        // localStorage.removeItem('token');
        // localStorage.removeItem('path');
       
        // Clear();
        dispatch(clear());
        router.push('/')
    }
    // active class add to nav element
    const handleClickNav = (e: any) => {
        setActiveClass(e.target.innerHTML);
        navActive(e.target.innerHTML);
        e.target.innerHTML === "Guest‘s" && router.push(navPath + '/guests')
        e.target.innerHTML === "Rented Customer" && router.push(navPath + '/rentedCustomer')
        e.target.innerHTML == "Security" && router.push(navPath + '/security')
    }
    // const Clear=()=>{
       
    //   }
 
    return (
        <div>
            <header>
                <div className="container">
                    <div className="row header_logo_wraper">
                        {/* <!--Logo--> */}
                        <div className="logo">
                            <a href="javascript:void(0)">
                                <Image src={logo} alt="Picture of the author" />
                                {/* <img src="" alt="logo" className="img-responsive"/> */}
                            </a>
                        </div>
                        {/* <!--Logo--> */}

                        {/* <!--Header tools--> */}
                        <div className="tools-top">
                            {/* <!--Avatar--> */}
                            <div className="avatar-profile">
                                <div className="user-edit">
                                    <h4>{userName},</h4>
                                    <a href="javascript:void(0)"><i className="fa fa-pencil"></i> edit profile</a>
                                </div>
                                <div className="avatar-image">
                                    <img src={userImage} alt="" className="img-responsive" />
                                </div>
                            </div>
                            {/* <!--Avatar--> */}

                            <ul className="tools-help">
                                {/* <li><a href="javascript:void(0)" title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Help"><i className="fa fa-question-circle"></i></a></li> */}
                                <li onClick={Logout}><a href="javascript:void(0)" title="" data-toggle="tooltip" data-placement="bottom" data-original-title="Logout"><i className="fa fa-sign-out"></i></a></li>
                            </ul>
                        </div>
                        {/* <!--Header tools--> */}
                    </div>
                </div>
            </header>

            {/* <!--Menu--> */}
            <nav>
                <div className="container">
                    <h4 className="navbar-brand">menu</h4>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </button>
                    </div>

                    <div className="navbar-collapse collapse">

                        <ul className="nav navbar-nav" id="nav">
                            {/* <li className="navItem active" onClick={()=>router.push('/appointmentList')}><i className="fa fa-list-alt"></i> <a href="#"> Guest's</a> </li> */}
                            <li className={(activeClass == "Guest's") || (navActives == "Guest's") ? "navItem active" : "navItem"} onClick={handleClickNav}><i className="fa fa-list-alt"></i> <a href="#">Guest&lsquo;s</a> </li>
                            {(userData?.user_data?.user_type == 'cus') ? null : <li className={(activeClass == "Rented Customer") || (navActives == "Rented Customer") ? "navItem active" : "navItem"} onClick={handleClickNav}> <i className="fa fa-address-book-o"></i> <a href="#">Rented Customer</a> </li>}
                            <li className={(activeClass == "Security") || (navActives == "Security") ? "navItem active" : "navItem"} onClick={handleClickNav}> <i className="fa fa-file-text-o"></i> <a href="#">Security</a> </li>
                            {/* <li> <i className="fa fa-files-o"></i> <a href="javascript:void(0)">Result Examinations</a> </li>
                            <li> <i className="fa fa-pencil"></i> <a href="javascript:void(0)">my account</a> </li> */}
                        </ul>
                        {/* <ul className="nav navbar-nav visible-mobile">
                            <li> <a href="javascript:void(0)">Home Landing Page</a> </li>
                            <li> <a href="javascript:void(0)">Blog</a> </li>
                            <li> <a href="javascript:void(0)">Single Post</a> </li>
                            <li> <a href="javascript:void(0)">Login Page</a> </li>
                            <li> <a href="javascript:void(0)">Register Page</a> </li>
                            <li> <a href="javascript:void(0)">Forgot Password</a> </li>
                            <li> <a href="javascript:void(0)">My Account</a> </li>
                            <li> <a href="javascript:void(0)">Help Page </a></li>
                            <li> <a href="javascript:void(0)">Find Doctors</a> </li>
                            <li> <a href="javascript:void(0)">Privacy Policy</a> </li>
                            <li> <a href="javascript:void(0)">Modify an Appointment</a> </li>
                            <li> <a href="javascript:void(0)">Appointments Empty</a> </li>
                            <li> <a href="javascript:void(0)">Error Page - 404</a> </li>
                        </ul>

                        <div className="flat-mega-menu">
                            <ul className="collapse">
                                <li><a href="#">Extra Pages</a>
                                    <ul className="drop-down one-column hover-fade">
                                        <li> <a href="javascript:void(0)">Home Landing Page</a> </li>
                                        <li> <a href="javascript:void(0)">Blog</a> </li>
                                        <li> <a href="javascript:void(0)">Single Post</a> </li>
                                        <li> <a href="javascript:void(0)">Login Page</a> </li>
                                        <li> <a href="javascript:void(0)">Register Page</a> </li>
                                        <li> <a href="javascript:void(0)">Forgot Password</a> </li>
                                        <li> <a href="javascript:void(0)">My Account</a> </li>
                                        <li> <a href="javascript:void(0)">Help Page </a></li>
                                        <li> <a href="javascript:void(0)">Find Doctors</a> </li>
                                        <li> <a href="javascript:void(0)">Privacy Policy</a> </li>
                                        <li> <a href="javascript:void(0)">Modify an Appointment</a> </li>
                                        <li> <a href="javascript:void(0)">Appointments Empty</a> </li>
                                        <li> <a href="javascript:void(0)">Error Page - 404</a> </li>
                                    </ul>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </nav>
            {/* <!--Menu--> */}
        </div>
    );
}
export default Header