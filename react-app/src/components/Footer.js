import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {

  return (
    <div className='footer-div'>
      <div className="footer">
        <div className="footer-content" style={{ fontWeight: '600' }}>Designed By:
          <a className="about-links" style={{ textDecoration: 'none', marginLeft: '60px', marginRight: '25px' }} href={'https://github.com/tjreinhardt'}>Tim Reinhardt</a>
          <a className="about-links" style={{ textDecoration: 'none', marginLeft: '25px', marginRight: '25px' }} href={'https://github.com/manyuanhuahua'}>Ting Feng</a>
          <a className="about-links" style={{ textDecoration: 'none', marginLeft: '25px', marginRight: '25px' }} href={'https://github.com/zhihongliu81'}>Zhihong Liu</a>
          <a className="about-links" style={{ textDecoration: 'none', marginLeft: '25px', marginRight: '25px' }} href={'https://github.com/Brian8771'}>Brian Aguilar</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
