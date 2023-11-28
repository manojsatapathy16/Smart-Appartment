"use client";
import React, { useState, useEffect } from "react";
import "../../../home/style.css";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PostContext } from '@/context/DataContext';
import { Logout } from "@mui/icons-material";
import axios from 'axios';
import { APIS } from "@/NetworkConroller";
import Header from "@/Components/Header/page";
import Footer from "@/Components/Footer/page";
import Image from 'next/image'
import nodatafound from '../../../../../public/nodatafound.png';
import Pagination from '../../../../Components/Paginations/pagination';
import { useSelector } from "react-redux";



const RentedCustomer = () => {
    const userData = useSelector((state: any) => state.userdata);
    const { navActive, navActives } = useContext(PostContext);
    const [activeClass, setActiveClass] = useState<any>(navActives)
    // const { userData } = useContext(PostContext);
    const [customerList, setCustomerList] = useState<any>([]);
    const [totalPage, setTotalPage] = useState('');
    const [pageSize, setPageSize] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [selectvalue, setSelectValue] = useState('');
    const [openPupop, setOpenPupop] = useState<any>(false);
    const [getId, setGetId] = useState<any>();
    const [actionApprove, setActionApprove] = useState<any>(false);
    const [actionActive, setActionActive] = useState<any>('True');


    const router = useRouter();





    useEffect(() => {
        getCall()
        setActiveClass("Rented Customer");
        navActive("Rented Customer");
    }, [actionApprove, actionActive])
    const getCall = () => {
        let token: any = userData.user_data?.token;
        try {
            const headers = { 'Authorization': 'Bearer ' + token };
            let formData = new FormData();

            formData.append('page_no', currentPage);
            formData.append('active', actionActive);
            axios.post(APIS.RENTED_CUSTOMER, formData, { headers }).then(({ data }) => {

                if (data.status) {
                    console.log(data, 'people list')
                    setCustomerList(data.data);
                    setTotalPage(data.total_pages);
                    setPageSize(data.pagesize)
                } else {
                    console.log(data.msg);
                    setCustomerList([]);
                }

            })
        }
        catch (err) {
            console.log(err);
            router.replace('./')
        }

    }
    const actionCall = (e: any) => {
        let token: any = userData.user_data?.token;
        try {
            const headers = { 'Authorization': 'Bearer ' + token };
            let formData = new FormData();
            formData.append('id', e);
            axios.post(APIS.APPROVAL_ACTION, formData, { headers }).then(({ data }) => {
                if (data.status) {
                    console.log(data, 'people list')
                    if (!actionApprove) {
                        setActionApprove(true);
                    } else if (actionApprove) {
                        setActionApprove(false);
                    }
                    setOpenPupop(false);


                } else {
                    setActionApprove(false);
                }

            })
        }
        catch (err) {
            console.log(err);
            // router.replace('./')
        }

    }
    const selectoptionhandleChange = (e: any) => {
        setSelectValue(e.target.value);
        if (e.target.value == 'active') {
            setActionActive('True')
        }
        else if (e.target.value == 'inactive') {
            setActionActive('False')
        }
    };
    const handleOpenPupop = (e: any) => {
        setGetId(e.target.id);
        setOpenPupop(true);
    };
    const selecthandleChange = (e: any) => {
        actionCall(e.target.id);
    };

    let PageSize = 1;

    console.log(customerList, 'data list is loaded***************')
    return (
        <div>

            <div id="layout">

                <Header />
                <section className="container">
                    <div className="main-container">
                        <div className="row">
                            <div className="listed">
                                <div className="row">
                                    <div className="filters">
                                        <h4>Filter by</h4>
                                        <ul className="list-unstyled">
                                            <li><a href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="highest to lowest"><i className="fa fa-arrow-down" aria-hidden="true"></i></a></li>
                                            <li><a href="#" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="lowest to highest"><i className="fa fa-arrow-up" aria-hidden="true"></i></a></li>
                                            <li>
                                                <select value={selectvalue} onChange={selectoptionhandleChange}>
                                                    <option value=''>Type of Appointment</option>
                                                    <option value='active'>active</option>
                                                    <option value='inactive'>deactive</option>

                                                </select>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                                {!customerList.length ? <div className="nodatafound">
                                    <Image
                                    src={nodatafound}
                                    alt="Landscape picture"
                                // width={500}
                                //   height={500}
                                /></div> : null}
                                {customerList?.map((each: any) => {
                                    return (

                                        <div className="row" key={each.mob_no}>

                                            {/* <!--Item--> */}
                                            <div className="col-lg-12">
                                                <div className="item-meeting">
                                                    {/* <!--Item--> */}
                                                    <div className="avatar-doctor">
                                                        <div className="avatar-image">
                                                            <img src={each?.picture} alt="doctor" className="img-responsive" />

                                                        </div>
                                                    </div>

                                                    <div className="data-meeting">
                                                        <ul className="list-unstyled info-meet info-meet-withbtn">
                                                            <li><p>Name: <span>{each.name}</span></p></li>
                                                            <li><p>Email: <span>{each.email}</span></p></li>
                                                            <li><p>Mobile Number: <span>{each.mob_no}</span></p></li>
                                                            <li><p>Date Of Birth: <span>{each.dob}</span></p></li>
                                                            <li><p>Flat: <span>{each.flat_no}</span></p></li>
                                                            <li><p>Address: <span>{each.adress}</span></p></li>
                                                        </ul>
                                                        <ul className="list-unstyled btns">
                                                            {each.active ? <li><button className="btn btn-green btn-xsmall confirm" onClick={handleOpenPupop} id={each.id}> Activated</button></li> : <li><button className="btn btn-red btn-xsmall confirm" onClick={handleOpenPupop} id={each.id}> Deactivated</button></li>}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--Item--> */}
                                        </div>)

                                })}
                                {!customerList.length ? '' : <Pagination
                                    className="pagination-bar"
                                    currentPage={currentPage}
                                    totalCount={totalPage}
                                    pageSize={PageSize}
                                    onPageChange={(page: any) => {
                                        setCurrentPage(page)

                                    }}
                                />}
                            </div>
                            {openPupop ? <div className="pupop_wrapper">
                                <div className="popup_inner">
                                    <div className="popup_body">
                                        <p>Do you agree?</p>
                                        <ul className="list-unstyled btns">
                                            <li><button className="btn btn-green btn-xsmall confirm" onClick={selecthandleChange} id={getId}>Yes</button></li>
                                            <li><button className="btn btn-red btn-xsmall confirm" onClick={() => setOpenPupop(false)} >No</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> : ''}

                            {/* <!--Aside--> */}
                            <aside>
                                <div className="elements-aside gray-color">
                                    <ul>
                                        <li className="color-1">
                                            <i className="fa fa-trophy" aria-hidden="true"></i>
                                            <h4>Achivement</h4>
                                            <p>If you need a doctor urgently outside of medicenter opening hours, call emergency appointment number for emergency service.</p>
                                        </li>
                                        <li className="color-2">
                                            <i className="fa fa-hourglass-half" aria-hidden="true"></i>
                                            <h4>Working Time</h4>
                                            <p>Monday to Friday <span> 05:00am to 10:00pm</span></p>
                                            <p>Weekends <span> 09:00am to 12:00pm</span></p>
                                        </li>
                                        <li className="color-1">
                                            <i className="fa fa-headphones" aria-hidden="true"></i>
                                            <h4>Help Line</h4>
                                            <p>If you need a doctor urgently outside of medicenter opening hours, call emergency appointment number for emergency service.</p>
                                        </li>
                                        <li className="color-3">
                                            <i className="fa fa-info" aria-hidden="true"></i>
                                            <h4>Doubts?</h4>
                                            <p>Office Av. 100 #0987-988, <span>Central Park</span></p>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                            {/* <!--Aside--> */}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>

    );
};
export default RentedCustomer;
