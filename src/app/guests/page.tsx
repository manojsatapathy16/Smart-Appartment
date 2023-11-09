"use client";
import React, { useState, useEffect, useMemo } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PostContext } from '@/context/DataContext';
import { Logout } from "@mui/icons-material";
import axios from 'axios';
import { APIS } from "@/NetworkConroller";
import Header from "@/Components/Header/page";
import Footer from "@/Components/Footer/page";
import Image from 'next/image'
import nodatafound from '../../../public/nodatafound.png';
import Pagination from '../../Components/Paginations/pagination';

import data from './data.json';




const Guests = () => {
    const { navActive, navActives } = useContext(PostContext);
    const [activeClass, setActiveClass] = useState<any>(navActives)
    const { userData } = useContext(PostContext);
    const [customerList, setCustomerList] = useState<any>([]);
    // console.log(userData,'contextdata')
    let token: any = localStorage.getItem('token');
    let userName: any = localStorage.getItem('userName');
    const [selectvalue, setSelectValue] = useState('');
    const [totalPage, setTotalPage] = useState('');
    const [pageSize, setPageSize] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const router = useRouter();




// console.log(totalPage,'totalpage*****')
// console.log(pageSize,'pageSize****')
    useEffect(() => {
        // console.log(router?.query,'@Manoj here')
        getCall()
        setActiveClass("Guest's");
        navActive("Guest's");
    }, [selectvalue,currentPage])

    const getCall = () => {
        try {
            const headers = { 'Authorization': 'Bearer ' + token };
            let formData = new FormData();
            formData.append('type', selectvalue);
            formData.append('page_no', currentPage);
            axios.post(APIS.CUSTOMER, formData, { headers }).then(({ data }) => {
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
                .catch(function (error) {
                    // handle error
                    console.log(error.response.status, 'errorqqqqqqqqqqqqqqqqqqqq');
                    if (error.response.status == '401') {
                        // router.push('/');
                    }
                });
        }
        catch (err) {
            console.log(err);
            router.replace('./')
        }

    }
    console.log(totalPage, 'total pages***************')

    const selecthandleChange = (e: any) => {
        setSelectValue(e.target.value);
    };
    let PageSize = 1;

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

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
                                                <select value={selectvalue} onChange={selecthandleChange}>
                                                    <option value=''>Type of Appointment</option>
                                                    <option value='visiting'>visiting</option>
                                                    <option value='checkedIn'>checkedIn</option>
                                                    <option value='checkedOut'>checkedOut</option>
                                                </select>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {!customerList.length ? <div className="nodatafound"><Image src={nodatafound} alt="no data found" /></div> : null}
                                {customerList?.map((each: any) => {
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
                                                            <li><p>Visiter Name: <span>{each.visitor_name}</span></p></li>
                                                            <li><p>Visit To: <span>{each.visit_to}</span></p></li>
                                                            <li><p>Flat No: <span>{each.flat_no}</span></p></li>
                                                            <li><p>Purpose: <span>{each.purpose}</span></p></li>
                                                            <li><p className="time">Arrival Time: <span>{each.arrival_time}</span></p></li>
                                                            <li><p className="time">Departure Time: <span>{each.departure_time}</span></p></li>
                                                            {/* <li><div className="alert alert-info" role="alert">Observations: Don't forget the copy of identification number.</div></li> */}
                                                        </ul>

                                                        {/* <ul className="list-unstyled btns">
                          <li><button className="btn btn-red btn-xsmall confirm"><i className="fa fa-times" aria-hidden="true"></i> cancel</button></li>
                          <li><a className="btn btn-xsmall" href="#"><i className="fa fa-arrow-down" aria-hidden="true"></i> print</a></li>
                          <li><a className="btn btn-green btn-xsmall" href="javascript:void(0)"><i className="fa fa-pencil" aria-hidden="true"></i> modify</a></li>
                          <li><a className="btn btn-green btn-xsmall" href="javascript:void(0)" target="_blank"><i className="fa fa-calendar" aria-hidden="true"></i> calendar</a></li>
                      </ul> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!--Item--> */}
                                        </div>)

                                })
                                }




                                {/* <div className="row">
                                    {customerList.length > '3' ?
                                        <div className="load-more">
                                            <a className="btn btn-green btn-small" href="#"> Load more</a>
                                        </div> : null}
                                </div> */}
                                {/* <div className="pagination">
                                    <ul>
                                        <li onClick={(e:any)=>setPaginationCount(e.target.innerHTML)}>1</li>
                                        <li onClick={(e:any)=>setPaginationCount(e.target.innerHTML)}>2</li>
                                        <li onClick={(e:any)=>setPaginationCount(e.target.innerHTML)}>3</li>
                                    </ul>
                                </div> */}
                                {!customerList.length ?'':<Pagination
                                    className="pagination-bar"
                                    currentPage={currentPage}
                                    totalCount={totalPage}
                                    pageSize={PageSize}
                                    onPageChange={(page: any) => {
                                        setCurrentPage(page)
                                        // console.log(page,"page chnaged")
                                      
                                    }}
                                />}
                            </div>

                            {/* <!--Aside--> */}
                            <aside>
                                <div className="elements-aside gray-color">
                                    <ul>
                                        <li className="color-1">
                                            <i className="fa fa-heartbeat" aria-hidden="true"></i>
                                            <h4>Emergency Case</h4>
                                            <p>If you need a doctor urgently outside of medicenter opening hours, call emergency appointment number for emergency service.</p>
                                        </li>
                                        <li className="color-2">
                                            <i className="fa fa-hourglass-half" aria-hidden="true"></i>
                                            <h4>Working Time</h4>
                                            <p>Monday to Friday <span> 05:00am to 10:00pm</span></p>
                                            <p>Weekends <span> 09:00am to 12:00pm</span></p>
                                        </li>
                                        <li className="color-1">
                                            <i className="fa fa-id-badge" aria-hidden="true"></i>
                                            <h4>Medical Services</h4>
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
export default Guests;
