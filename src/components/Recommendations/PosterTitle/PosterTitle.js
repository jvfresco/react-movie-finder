import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import classes from './PosterTitle.css';

const posterTitle = (props) => {
  const title = useRef();
  const t1 = gsap.timeline();

  //The animation needs to be executed after the component is mounted, otherwise the ref wont work
  useLayoutEffect(() => {
    t1.to(title.current, { duration: 0.5, opacity: 1, scaleX: 1 });
    t1.to(title.current, { duration: 0.5, color: "rgba(0, 0, 0, 1)" });
  });

  return (
    <div ref={title} className={classes.PosterTitle}>
      {props.title}
    </div>
  );
};

export default posterTitle;