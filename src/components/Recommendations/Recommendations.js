import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import classes from './Recommendations.css';
import PosterTitle from './PosterTitle/PosterTitle';
import {Link} from 'react-router-dom'
import gsap from 'gsap';
import {baseUrl, useAsync} from '../../util/util';
import {apiKey} from '../../util/config'

const recommendations = ({id, requestMovieData}) => {
  const [recommendations, setRecommendations] = useState(null);  
  const [hoveredPoster, setHoveredPoster] = useState('');
  const posterList = useRef([]);
  
  useEffect(() => { //Fetches the recommendations from the server
    if (id){
      useAsync(baseUrl + 'movie/'+ id +'/recommendations'+ apiKey +'&page=1')
      .then(data => {
        setRecommendations(data.results.slice(0,4));
      });
    }
    //The return function cleans up when unmounting
    return () => {
      setRecommendations(null)
      setHoveredPoster(null)
    };
  }, [id]);

  useLayoutEffect(() => {
    //Check first for recommendations existence and length, then animate them
    if(recommendations && recommendations.length > 0 ){
      gsap.to(posterList.current, {duration: 2, opacity:1, stagger: 0.5, delay: 1})
    }
  },[recommendations]);


  let recommendationsTable = null;
  if (recommendations) {
    recommendationsTable = (
      <div className={classes.Recommendations}>
        <div className={classes.RecommendationsHead}>
          {recommendations.length > 0
            ? "YOU MAY ALSO LIKE"
            : "NO RECOMMENDATIONS AVAILABLE FROM THIS MOVIE"}
        </div>
        <div className={classes.Table}>
          <div className={classes.PosterRow}>
            {recommendations.map((recommendation, index) => {
              //Component PosterTitle will be only shown when hovering the recommendation
              return (
                <div
                  ref={(element) => {
                    posterList.current[index] = element;
                  }}
                  key={recommendation.id}
                  className={classes.Poster}
                  onClick={() => requestMovieData(recommendation.id)}
                  onMouseEnter={() => setHoveredPoster(recommendation.id)}
                  onMouseLeave={() => setHoveredPoster(null)}
                >
                  <Link to={`/movie/${recommendation.id}`}>
                    {hoveredPoster === recommendation.id ? (
                      <PosterTitle title={recommendation.title} />
                    ) : null}
                    <img
                      className={classes.PosterImage}
                      src={
                        "https://image.tmdb.org/t/p/w92/" +
                        recommendation.poster_path
                      }
                      alt=""
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return recommendationsTable;
}

export default recommendations;
