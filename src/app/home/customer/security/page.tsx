"use client";
import React, { useState, useEffect, useMemo } from "react";
import "../guests/style.css";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PostContext } from '@/context/DataContext';
import { Logout } from "@mui/icons-material";
import axios from 'axios';
import { APIS } from "@/NetworkConroller";
import Header from "@/Components/Header/page";
import Footer from "@/Components/Footer/page";
import Image from 'next/image'
import nodatafound from '../../../../public/nodatafound.png';
import Pagination from '../../../../Components/Paginations/pagination';

import data from '../guests/data.json';



const Security = () => {
    const { navActive, navActives } = useContext(PostContext);
    const [activeClass, setActiveClass] = useState<any>(navActives)
    const { userData } = useContext(PostContext);
    const [securityList, setSecurityList] = useState<any>([]);
    const [actionApprove, setActionApprove] = useState<any>(false);
    const [openPupop, setOpenPupop] = useState<any>(false);
    const [getId, setGetId] = useState<any>();
    const [totalPage, setTotalPage] = useState('');
    const [pageSize, setPageSize] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<any>(1);
    // console.log(userData,'contextdata')
    
    let token: any = localStorage.getItem('token');
    let userName: any = localStorage.getItem('userName');
    let authorization: any = localStorage.getItem('authorization');
    const router = useRouter();




    useEffect(() => {
        // console.log(router?.query,'@Manoj here')
        getCall()
        setActiveClass("Security");
        navActive("Security");
    }, [actionApprove])
    // console.log(securityList?.data?.visitor_name, 'people list')
    const getCall = () => {
        try {
            const headers = { 'Authorization': 'Bearer ' + token };
            let formData = new FormData();
            formData.append('page_no', currentPage);
            axios.post(APIS.SECURITY_LIST_CUSTOMER, formData, { headers }).then(({ data }) => {
                if (data.status) {
                    console.log(data, 'people list')
                    setSecurityList(data.data);
                    setTotalPage(data.total_pages);
                    setPageSize(data.pagesize)

                } else {
                    console.log(data.msg);
                }

            })
        }
        catch (err) {
            console.log(err);
            router.replace('./')
        }

    }
    const actionCall = (e: any) => {
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
    console.log(securityList, 'data list is loaded***************')

    const handleOpenPupop = (e: any) => {
        setGetId(e.target.id);
        setOpenPupop(true);
    };

    const selecthandleChange = (e: any) => {
        actionCall(e.target.id);
    };

    let PageSize = 1;

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
   
    return (
        <div>

            <div id="layout">

                <Header authorization={authorization}/>
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
                                                <select>
                                                    <option selected={true}>select</option>
                                                    <option>Active Security</option>
                                                    <option>Inactive Security</option>
                                                </select>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {securityList?.map((each: any) => {
                                    return (

                                        <div className="row">

                                            {/* <!--Item--> */}
                                            <div className="col-lg-12">
                                                <div className="item-meeting">
                                                    {/* <!--Item--> */}
                                                    <div className="avatar-doctor">
                                                        <div className="avatar-image">
                                                            <img src={each?.picture} alt="doctor" className="img-responsive" />
                                                            {/* <h4>
                          <a href="javascript:void(0)" title="See Profile">{each.visitor_name}</a></h4> */}
                                                            {/* <p>Cardiothoracic Anesthesia and Anesthesiology - FCI</p> */}
                                                        </div>
                                                    </div>

                                                    <div className="data-meeting">
                                                        <ul className="list-unstyled info-meet">
                                                            <li><p>Name: <span>{each.name}</span></p></li>
                                                            <li><p>Email: <span>{each.email}</span></p></li>
                                                            <li><p>Mobile Number: <span>{each.mob_no}</span></p></li>
                                                            <li><p>Date Of Birth: <span>{each.dob}</span></p></li>
                                                            {/* <li><p>Flat: <span>{each.flat_no}</span></p></li> */}
                                                            <li><p>Address: <span>{each.adress}</span></p></li>
                                                            {/* <li><div className="alert alert-info" role="alert">Observations: Don't forget the copy of identification number.</div></li> */}
                                                        </ul>

                                                        <ul className="list-unstyled btns">
                                                            {each.active ? <li><button className="btn btn-green btn-xsmall confirm" onClick={handleOpenPupop} id={each.id}> Active</button></li> : <li><button className="btn btn-red btn-xsmall confirm" onClick={handleOpenPupop} id={each.id}> Inactive</button></li>}



                                                            {/* <li><a className="btn btn-xsmall" href="#"><i className="fa fa-arrow-down" aria-hidden="true"></i> print</a></li>
                          <li><a className="btn btn-green btn-xsmall" href="javascript:void(0)"><i className="fa fa-pencil" aria-hidden="true"></i> modify</a></li>
                          <li><a className="btn btn-green btn-xsmall" href="javascript:void(0)" target="_blank"><i className="fa fa-calendar" aria-hidden="true"></i> calendar</a></li> */}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <Pagination className="pagination-bar"
                                                    currentPage={currentPage}
                                                    totalCount={totalPage}
                                                    pageSize={pageSize}
                                                    onPageChange={(page: any) => {
                                                        setCurrentPage(page)


                                                    }}
                                                />
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
                                            {/* <!--Item--> */}
                                        </div>)

                                })}



                                {/* 
                            <div className="row">
                                <div className="load-more">
                                    <a className="btn btn-green btn-small" href="#"> Load more</a>
                                </div>
                            </div> */}
                            </div>

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
export default Security;
