import React, {useRef, useLayoutEffect} from 'react';
import classes from './Rating.css';
import gsap from 'gsap';

const rating = props => {
  const bar = useRef();

  useLayoutEffect(()=>{ //Animation for the rating bar
    let barWidth = props.value*10; 
    gsap.to(bar.current, {duration: 2, width: barWidth});
  });

  return (
    <div className={classes.Rating}>
      <div className={classes.Source}>{props.source}</div>
      <div ref={bar} className={classes.Value} style={{width: "0%"}}>{props.value}</div>
    </div>
  )

}

export default rating;