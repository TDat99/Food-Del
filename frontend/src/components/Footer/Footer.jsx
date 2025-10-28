import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem Ipsum is simply dummy text used in printing and typesetting. It has been the industry's standard placeholder text since the 1500s.</p>
            </div>
            <div className="footer-social-icons">
                <a href='https://www.facebook.com/datkunkka'><img src={assets.facebook_icon} alt="" /></a>
                <a href="https://x.com/tTin1764181"><img src={assets.twitter_icon} alt="" /></a>
                <img src={assets.linkedin_icon} alt="" />
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>CONTACT</h2>
                <ul>
                    <li>+84 878158119</li>
                    <li>tiendat299204@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright © 2025 Food Delivery App. All rights reserved.</p>
    </div>
  )
}

export default Footer