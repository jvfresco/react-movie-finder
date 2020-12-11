import React, { useState, useEffect, useRef } from 'react';
import classes from './Search.css';
import MovieDropList from '../MovieDropList/MovieDropList';
import {baseUrl, useAsync} from '../../util/util'
import {apiKey} from '../../util/config'

const search = props => {
  const [filteredMovies, setFilteredMovies] = useState('');
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();
  


  useEffect(() => {
    //Send a query to database to fetch occurrences with that name. Waits 1 second to make sure user has stopped typing comparing the value 1 second ago prior to perform the action 
    if (inputValue.length > 1 ){
      setTimeout(() => {
        if (inputValue === inputRef.current.value){
          useAsync(baseUrl + 'search/movie' + apiKey + '&query='+ inputValue)
          .then(data =>{
            //Slice the array response to get only the 5 first occurences
            setFilteredMovies(data.results.slice(0,5));
          });
        }
      },1000);
    } else {
      setFilteredMovies(null);
    }
  },[inputValue]);
  

  const movieSelectedHandler = id => {
    //Clears droplist and sends up the movie id to app component
    setFilteredMovies(null);
    props.requestMovieData(id);
    setInputValue('');
  }

  //If there are no movies in the array, dropdown list is not showed
  let movieDropList = filteredMovies ? (<MovieDropList clearList={() => setFilteredMovies(null)} movieList={filteredMovies} selected={movieSelectedHandler}></MovieDropList>) : null;

  return(
  <div className={classes.Navbar}>
    <input ref={inputRef} type='text' placeholder='Search your desired movie here...' onChange={(event) => setInputValue(event.target.value)} value={inputValue}></input>
    {movieDropList}
  </div>);
}

export default search;