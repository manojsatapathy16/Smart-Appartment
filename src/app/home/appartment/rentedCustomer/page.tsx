"use client";
import React, { useState, useEffect } from "react";
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
import nodatafound from '../../../../../public/nodatafound.png';
import Pagination from '../../../../Components/Paginations/pagination';



const RentedCustomer = () => {
    const { navActive,navActives } = useContext(PostContext);
    const [activeClass,setActiveClass]=useState<any>(navActives)
    const {userData} = useContext(PostContext);
    const [customerList,setCustomerList]=useState<any>([]);
    const [totalPage, setTotalPage] = useState('');
    const [pageSize, setPageSize] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [selectvalue, setSelectValue] = useState('');
    // console.log(userData,'contextdata')
    let token:any = localStorage.getItem('token');
    let userName:any = localStorage.getItem('userName');
    const router = useRouter();



  

useEffect(()=>{
    // console.log(router?.query,'@Manoj here')
    getCall()
    setActiveClass("Rented Customer");
    navActive("Rented Customer");
},[])
// console.log(customerList?.data?.visitor_name, 'people list')
const getCall = ()=>{
    try{
        const headers = { 'Authorization': 'Bearer ' + token };
        let formData = new FormData();

        formData.append('page_no', currentPage);
        axios.post(APIS.RENTED_CUSTOMER, formData,{ headers }).then(({data}) => {
            
                if(data.status){
                    console.log(data, 'people list')
                    setCustomerList(data.data); 
                    setTotalPage(data.total_pages);
                    setPageSize(data.pagesize)
                }else{
                    console.log(data.msg);
                    setCustomerList([]);
                }
    
            })
        }
        catch(err){
            console.log(err);
            router.replace('./')
        }
    
}
let PageSize = 1;

console.log(customerList, 'data list is loaded***************')
    return (
        <div>
            
            <div id="layout">
           
<Header/>
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
                                                <option selected={true}>Type of Appointment</option>
                                                <option>General</option>
                                                <option>Specialist</option>
                                            </select>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {customerList?.map((each:any) => {
                           return(   
                               
          <div className="row" key={each.mob_no}>
             
          {/* <!--Item--> */}
          <div className="col-lg-12">
              <div className="item-meeting">
                  {/* <!--Item--> */}
                  <div className="avatar-doctor">
                      <div className="avatar-image">
                          <Image src={each?.picture} alt="doctor" className="img-responsive"/>
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
                          <li><p>Flat: <span>{each.flat_no}</span></p></li>
                          <li><p>Address: <span>{each.adress}</span></p></li>
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
          
        })}
                           

                        

                            {/* <div className="row">
                                <div className="load-more">
                                    <a className="btn btn-green btn-small" href="#"> Load more</a>
                                </div>
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

          <Footer/>
        </div>
        </div>

    );
};
export default RentedCustomer;
