"use client";
import "./globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <>
      <div className="error_wrapper">
        
        <div className="error_image">
          {/* <Image src={error_img} alt="profile_img" /> */}
        </div>
        {/* <div className="error_backto_home_btn">
          <button>Back to home</button>
        </div> */}
      </div>
    </>
  );
};
export default PageNotFound;
