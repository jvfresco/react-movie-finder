import React, { useLayoutEffect, useRef} from 'react';
import classes from './Footer.css';
import gsap from 'gsap';

const footer = props => {

  const footerRef = useRef(null);

  //Animation
  useLayoutEffect(() => {
    gsap.to(footerRef.current, {duration:3, opacity:1, y:0, delay:4});
  },[]);

  return (
    <div className={classes.Footer}>
      <div ref={footerRef} className={classes.Animation}>
        <div>Powered By</div>
        <div className={classes.Logos}>
          <a href="https://www.themoviedb.org">
            <div className={classes.Logo}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                width="100px"
                alt="The Movie Database"
              ></img>
            </div>
          </a>
          <a href="https://www.imdb.com">
            <div className={classes.Logo}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png"
                width="100px"
                alt="Internet Movie Database"
              ></img>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default footer;