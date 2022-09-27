import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  "https://www.instagram.com/static/images/homepage/screenshots/screenshot3.png/94edb770accf.png",
  "https://www.instagram.com/static/images/homepage/screenshots/screenshot2.png/4d62acb667fb.png",
  "https://www.instagram.com/static/images/homepage/screenshots/screenshot4.png/a4fd825e3d49.png",
];


const Slideshow = () => {
  return (
    <div className="slide-container">
      <Fade>
        <div className="each-fade">
          <img src={fadeImages[0]} />
        </div>
        <div className="each-fade">
          <img src={fadeImages[1]} />
        </div>
        <div className="each-fade">
          <img src={fadeImages[2]} />
        </div>
      </Fade>
    </div>
  )
}

export default Slideshow;
