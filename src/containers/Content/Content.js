import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import classes from './Content.css';
import Ratings from '../../components/Ratings/Ratings';
import Recommendations from '../../components/Recommendations/Recommendations';
import gsap from 'gsap';
import { useRatings } from '../../util/util';

const content = props =>{  
  const [ratings, imdbData] = useRatings(props);
  const [genres, setGenres] = useState(null)
  const posterImage = useRef('');
  const contentRef = useRef('');
  const tl = gsap.timeline();
  //Extracts the genres of the movie, if any, and formats them
  useEffect(() => {
    if (props.movieData.genres) {
      const genres = props.movieData.genres
        .map((genre) => {
          return genre.name;
        })
        .join(", ");
      setGenres(genres);
    }
    return () => setGenres(null);
  }, [props.movieData.genres]);
 
  useLayoutEffect(()=>{ //Animation executed only the first time the component loads
    tl.add(gsap.fromTo(contentRef.current, 2, {y:30, opacity: 0.5}, {y:0, opacity:1}),0);
   },[]);
  
  useLayoutEffect(()=>{ //Animation executed after a change of movie
    tl.add(gsap.fromTo(posterImage.current, 1, {x:30, y:-30, autoAlpha:0}, {x:0, y:0, autoAlpha:1}),1);
  }, [props.movieData])
 
  return(
  <div ref={contentRef} className={classes.Content}>
    <div className={classes.MovieData}>
      <div className={classes.ContentData}>
        <h1>{props.movieData.title}</h1>
        <p className={classes.Genres}>{genres}</p>
        <h2>"{props.movieData.tagline}"</h2>
        <h3>{props.movieData.overview}</h3>
        <div className={classes.Table}>
          <div className={classes.Row}>
            <div className={classes.Label}>
              <span>Director:</span> 
            </div>
            <div className={classes.Value}>
              <span>{imdbData.Director}</span> 
            </div>
            <div className={classes.Label}>
              <span>Release:</span>
            </div> 
            <div className={classes.Value}>
              <span>{props.movieData.release_date}</span>
            </div> 
            
          </div>
          <div className={classes.Row}>
            <div className={classes.Label}>
              <span>Rated:</span>
            </div>
            <div className={classes.Value}>
              <span>{imdbData.Rated}</span>
            </div>
            <div className={classes.Label}>
              <span>Runtime:</span>
            </div>
            <div className={classes.Value}>
              <span>{props.movieData.runtime} min.</span>
            </div>
          </div>
        </div>
        <div className={classes.Ratings}>
          <Ratings ratings={ratings} />
        </div>
          <Recommendations id={props.movieData.id} requestMovieData={props.requestMovieData} />
      </div>
    </div>

    <div className={classes.Poster}  >  
      <img ref={posterImage} className={classes.PosterImage} src={'https://image.tmdb.org/t/p/w500' + props.movieData.poster_path} alt=''></img>
    </div>
  </div>);
}

export default content; 