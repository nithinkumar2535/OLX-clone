import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="contents">
        <div className="list-section">
          <ul>
            <p>POPULAR LOCATIONS</p>
            <li>kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>
        <div className="list-section">
          <ul>
            <p>TRENDING LOCATIONS</p>
            <li>Bhuvaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>
        <div className="list-section">
          <ul>
            <p>ABOUT US</p>
            <li>Contact us</li>
            <li>Tech@olx</li>
          </ul>
        </div>
        <div className="list-section">
          <ul>
            <p>OLX</p>
            <li>Blog</li>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy information</li>
            <li>Vulnerability Disclosure Program</li>
          </ul>
        </div>
        <div className="list-section">
          <p className='follow'>FOLLOW US</p>
          <div>
            <i className="fa-brands fa-facebook-f me-3"></i>
            <i className="fa-brands fa-instagram me-3"></i>
            <i className="fa-brands fa-twitter me-3"></i>
            <i className="fa-regular fa-circle-play me-3"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
