"use client";
import React, { useState, useEffect, useMemo } from "react";
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

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





const Guests = () => {
    var initialValue={visitorName:'',Purpose:'',ArrivalTime:'',Members:'',UploadImage:''};
    const { navActive, navActives } = useContext(PostContext);
    const [activeClass, setActiveClass] = useState<any>(navActives)
    const { userData } = useContext(PostContext);
    const [customerList, setCustomerList] = useState<any>([]);
    // console.log(userData,'contextdata')
    const [selectvalue, setSelectValue] = useState('');
    const [totalPage, setTotalPage] = useState('');
    const [pageSize, setPageSize] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [openPupop, setOpenPupop] = useState<any>(false);
    const [addGuest, setAddGuest] = useState<any>(initialValue);
    let token: any = localStorage.getItem('token');
    let userName: any = localStorage.getItem('userName');
    let authorization: any=localStorage.getItem('authorization');

    const router = useRouter();



    // console.log(totalPage,'totalpage*****')
    // console.log(pageSize,'pageSize****')
    useEffect(() => {
        // console.log(router?.query,'@Manoj here')
        getCall()
        setActiveClass("Guest's");
        navActive("Guest's");
    }, [selectvalue, currentPage])

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

    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return data.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const addCustomerHandle = (e: any) => {
        setOpenPupop(true);
    };

// popupget value
const getValueHandler=(e:any)=>{
    const { id, value } = e.target;
    setAddGuest({...addGuest,[id]: value});
}

//  addVisiterSubmitHandler
const addVisiterSubmitHandler=(e:any)=>{
    e.preventDefault();
    addVisiters();
}
const addVisiters = () => {
    try {
        const headers = { 'Authorization': 'Bearer ' + token };
        let formData = new FormData();
     
        formData.append('name', addGuest.visitorName);
        formData.append('purpose', addGuest.Purpose);
        formData.append('expected_arrival', addGuest.ArrivalTime);
        formData.append('picture', addGuest.UploadImage);
        formData.append('members', addGuest.Members);
        axios.post(APIS.ADD_VISITERS, formData, { headers }).then(({ data }) => {
            if (data.status) {
                console.log(data, 'great')
                setAddGuest(initialValue);
            } else {
                console.log(data.msg);
                
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
                                            {(authorization!='cus')?null:<li className="addGuest"><button className="btn btn-green btn-xsmall confirm" onClick={addCustomerHandle}>+ Add Guest</button></li>}
                                            
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

                                        <div className="row" key={each.visitor_name}>

                                            {/* <!--Item--> */}
                                            <div className="col-lg-12">
                                                <div className="item-meeting">
                                                    {/* <!--Item--> */}
                                                    <div className="avatar-doctor">
                                                        <div className="avatar-image">
                                                            {/* <OwlCarousel className='owl-theme' loop margin={10} nav autoplay={true} {...product_slider}>
    <div className='item'>
    <img src={each?.allimg[0]} alt="doctor" className="img-responsive" />
    </div>
    <div className='item'>
    <img src={each?.allimg[0]} alt="doctor" className="img-responsive" />
    </div>
    <div className='item'>
    <img src={each?.allimg[0]} alt="doctor" className="img-responsive" />
    </div>
    <div className='item'>
    <img src={each?.allimg[0]} alt="doctor" className="img-responsive" />
    </div>
    
</OwlCarousel>; */}

                                                            <Slider {...settings}>
                                                                {each?.allimg?.map((img: any) => {
                                                                    return (
                                                                        <div key={img}>
                                                                            <Image src={img} alt="doctor" className="img-responsive" />
                                                                        </div>
                                                                    )
                                                                })}


                                                            </Slider>

                                                            {/* <img src={each?.allimg[0]} alt="doctor" className="img-responsive" /> */}
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
                                {!customerList.length ? '' : <Pagination
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
                {openPupop ? <div className="pupop_wrapper addVisitor">
                    <div className="popup_inner">
                        <div className="popup_body">
                            <p>Add Visiter</p>
                            <form onSubmit={addVisiterSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="visitorName" className="form-label">Name</label>
                                    <input type="text" value={addGuest.visitorName} className="form-control" id="visitorName" aria-describedby="emailHelp"  onChange={getValueHandler}/>
                                </div>
                            
                         
                                <div className="mb-3">
                                    <label htmlFor="Purpose" className="form-label">Purpose</label>
                                    <input type="text" value={addGuest.Purpose} className="form-control" id="Purpose" onChange={getValueHandler}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ArrivalTime" className="form-label">Arrival Time</label>
                                    <input type="text" value={addGuest.ArrivalTime} className="form-control" id="ArrivalTime" onChange={getValueHandler}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Members" className="form-label">Members</label>
                                    <input type="text" value={addGuest.Members} className="form-control" id="Members" onChange={getValueHandler}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="UploadImage" className="form-label">Upload Image</label>
                                    <input type="file" value={addGuest.UploadImage} className="form-control" id="UploadImage" onChange={getValueHandler}/>
                                </div>
                                <ul className="list-unstyled btns">
                                    <li><button type="submit" className="btn btn-green btn-xsmall confirm">Submit</button></li>
                                    <li><button className="btn btn-red btn-xsmall confirm" onClick={() => setOpenPupop(false)}> cancel</button></li>
                                </ul>
                               
                            </form>
                            {/* <p>Do you agree?</p>
                                                        <ul className="list-unstyled btns">
                                                            <li><button className="btn btn-green btn-xsmall confirm" onClick={selecthandleChange}>Yes</button></li>
                                                            <li><button className="btn btn-red btn-xsmall confirm" onClick={() => setOpenPupop(false)} >No</button></li>
                                                        </ul> */}
                        </div>

                    </div>
                </div> : ''}
                <Footer />
            </div>
        </div>

    );
};
export default Guests;
