import React from 'react';
import classes from './MovieItem.css';


const movieItem = (props) => {
  //Row clickable containing and showing the data for each movie
  return (
    <div className={classes.Row} onClick={() => props.selected(props.id)}>
      <div className={classes.Poster}>
        {props.posterPath ? (
          <img
            src={"https://image.tmdb.org/t/p/w45/" + props.posterPath}
            alt=""
          />
        ) : null}
      </div>
      <div className={classes.Title}>{props.title}</div>
      <div className={classes.Release}>
        {props.release ? props.release.substring(0, 4) : null}
      </div>
    </div>
  );
};

export default movieItem;