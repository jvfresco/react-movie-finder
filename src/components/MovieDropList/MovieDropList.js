import React, { useRef, useEffect, useLayoutEffect } from 'react';
import MovieItem from './MovieItem/MovieItem';
import classes from './MovieDropList.css';
import { gsap } from "gsap";
import {Link} from 'react-router-dom'

const movieDropList = props => {
//Useref to assign the ref of the contianer ul list
let list = useRef();
let listItem = useRef([]);
let t1 = gsap.timeline();

//Create event listener to be assigned to the node 
useEffect(() =>{
  document.addEventListener("mousedown", handleClick);
  return () => {
    document.removeEventListener("mousedown", handleClick);
  };
}, []);

useLayoutEffect(()=> {
  if(listItem.current.length > 0){ //If the list has items animate them
    t1.to(list.current, 1.25, {scaleY: 1, opacity:1} );
    t1.staggerTo( listItem.current , 0.5, { opacity: 1, y: 0  }, 0.25);
  }
}, [listItem])

//When click outside node list of movies is cleared and therefore ul list not showed
const handleClick = (e, id) => {
  if (list.current.contains(e.target)){
    return;
  }
  props.clearList();
}


//Create a MovieItem component for each of the movies of the array passing the data required in each one 
let filmList; 
if (props.movieList.length > 0) {
  filmList = props.movieList.map((movie, index) => {
    return (
      <li
        key={index}
        className={classes.MovieMember}
        ref={(element) => {
          listItem.current[index] = element;
        }}
      >
        <Link to={`/movie/${movie.id}`}>
          <MovieItem
            key={movie.id}
            id={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            release={movie.release_date}
            selected={props.selected}
          />
        </Link>
      </li>
    );
  });
} else {
  filmList = (
    <li
      key="0"
      className={classes.MovieMember}
      ref={(element) => {
        listItem.current["0"] = element;
      }}
    >
      Your search did not produce any result
    </li>
  );
}

  
return <ul ref={list} className={classes.List}>{filmList}</ul>;

}

export default movieDropList;