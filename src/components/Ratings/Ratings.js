import React, {useEffect} from 'react';
import classes from './Ratings.css';
import Rating from './Rating/Rating';
import {useAverage} from '../../util/util';

const ratings = props => {
  const [averageRating, setArray] = useAverage(1);
  //Effect that calculates the average rating with the help of a custom hook
  useEffect(() => {
    if(props.ratings){ 
      setArray(props.ratings.map(value => value.Value));
    }
  }, [props.ratings])
  
  let scores = null;
  if(props.ratings){
    scores = props.ratings.map((rating, idx) =>{
      return <Rating key={idx} source={rating.Source} value={rating.Value}></Rating>
    })
  }  
  
  return (
    <div className={classes.Center}>
      <div className={classes.Scores}>{scores}</div>
      <div className={classes.AverageScore}>
        <div className={classes.AverageRating}>
          <div>{averageRating}/10</div>
          <div style={{fontSize: "0.3em", margin: "5px 0" }}>AVERAGE RATING</div>
        </div>
        <div className={classes.Stars} style={{ //Inline style is used to be able to change dinamically the value
          backgroundImage:"linear-gradient(90deg, red "+averageRating*10+"%, white "+averageRating*10+"%)"
        }}>
          ★★★★★★★★★★
        </div>
      </div>
    </div>
  );
}

export default ratings;