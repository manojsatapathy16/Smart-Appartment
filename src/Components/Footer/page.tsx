"use client";
import Image from 'next/image'
import sponsor from '../../../public/sponsor-photodune.png'


function Footer() {

    return (
        <div>
              {/* <footer>
                <div className="container">
                    <div className="row">
                        <div className="emergency-number">
                            <p className="phone">(01) + 8000123456</p>
                            <h5><i className="fa fa-phone-square"></i> emergency contact</h5>
                        </div>

                        <div className="emergency-number email">
                            <p>support@smartapartment.com</p>
                            <h5>online consultation <i className="fa fa-building-o" aria-hidden="true"></i>
</h5>
                        </div>


                        <div className="help-people">
                            <hr className="divisor"/>

                       
                            <div className="sponsors">
                                <span><a href="#"><Image src={sponsor} alt="sponsor" className="img-responsive"/></a></span>
                                <span><a href="#"><Image src={sponsor} alt="sponsor" className="img-responsive"/></a></span>
                                <span><a href="#"><Image src={sponsor} alt="sponsor" className="img-responsive"/></a></span>
                                <span><a href="#"><Image src={sponsor} alt="sponsor" className="img-responsive"/></a></span>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </footer> */}
            {/* <!--Copyrights--> */}
            <div className="copyrights">
                {/* <!--Meet Social--> */}
                <div className="meet-social">
                    <span><a href="https://www.facebook.com/IwThemesTF" target="_blank"><i className="fa fa-facebook-square"></i></a></span>
                    <span><a href="https://twitter.com/iwthemes" target="_blank"><i className="fa fa-twitter-square"></i></a></span>
                    <span><a href="https://www.youtube.com/channel/UCEb3nAep6tYiAkZpqi0Kzew" target="_blank"><i className="fa fa-youtube-square"></i></a></span>
                    <span><a href="#"><i className="fa fa-linkedin-square"></i></a></span>
                </div>
                {/* <!--Meet Social--> */}
                <p>© 2023 - <a href="#" target="_blank">Smart Apartment</a><img src="appointments-reserved_data/envalogo.png" alt="sms" className="img-responsive"/>. All Rights Reserved. <a href="https://html.iwthemes.com/mas/privacy-policy.html">Privacy Policy</a></p>
            </div>
            {/* <!--Copyrights--> */}

            <section className="help-box" style={{display: 'none'}}>
                <div className="body-help">
                    <span className="close-box"><i className="fa fa-times"></i></span>
                    <i className="fa fa-question-circle"></i>
                    <h5>Do you need our Help?</h5>
                    <p>If you need a help about how get an a book just write us and we are going to grateful to help.</p>
                    <a href="https://html.iwthemes.com/mas/help.html" className="chat-link">Contact us Now</a>
                </div>
            </section>
        </div>
    );
}
export default Footer