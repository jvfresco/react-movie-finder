import {useState, useEffect, useRef} from 'react'
import {apiKey, imdbApiKey} from './config'

export const baseUrl = 'https://api.themoviedb.org/3/';

export const useMovieData = (id) =>{
  const [selectedMovieData, setSelectedMovieData] = useState('');
  const [movieID, setMovieID] = useState(id);
  const [errorState, setErrorState] = useState({error:false, message:''});

  useEffect(()=>{
    if(errorState.error){
      setErrorState({error: false, message:''});
    }
    //Send movie data request
    const url = baseUrl + 'movie/' + movieID + apiKey;
    useAsync(url).then(movieData => {
      if(movieData.id){
        document.getElementById('container').scroll(0,0);
        return setSelectedMovieData(movieData);
      }
    });

  },[movieID])


  return [selectedMovieData, setMovieID, errorState]
}


export const useAsync = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error("There has been a problem loading the data.");
    });
};

//Utility function to obtain the previous rendered value
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

//Custom hook to retrieve and format ratings from two websites
export const useRatings = (props) => {
  const [ratings, setRatings] = useState();
  const [imdbData, setImdbData] = useState('');
  //Extract and convert ratings to be passed to Ratings component

  useEffect(() =>{
    if(props.movieData){
      const url = 'http://www.omdbapi.com/?apikey=' + imdbApiKey + '&i=' + props.movieData.imdb_id;
      fetch(url).then(response => response.json())
      .then(data =>{
        setImdbData(data);
        formatRatings(data);
      })
    }
  }, [props.movieData]);

  function formatRatings(data){
    const ratingsArray = [...data.Ratings];
    //Check for the existence of the rating and assign value depending on source and array position
    data.Ratings.forEach((value, i) => {
      switch (value.Source) {
        case "Internet Movie Database":
          const imdbScore = Number(data.Ratings[i].Value.slice(0,data.Ratings[i].Value.indexOf("/")));
          return ratingsArray[i].Value = imdbScore;
        case "Rotten Tomatoes":
          const rottenTotatoesScore = Number(data.Ratings[i].Value.slice(0,data.Ratings[i].Value.indexOf("%")) / 10);
          return ratingsArray[i].Value = rottenTotatoesScore;
        case "Metacritic":
          const metacriticScore = Number(data.Ratings[i].Value.slice(0,data.Ratings[i].Value.indexOf("/")) / 10);
          return ratingsArray[i].Value = metacriticScore ;
        default: return null;  
      }
    });
    //Create and push a new object for TMDB rating taht comes from props
    ratingsArray.push({Source:'The Movie Database', Value:props.movieData.vote_average});
    setRatings(ratingsArray);
  }
  return [ratings, imdbData];

} 

//Custom hook to calculate an average from an array. Accepts the number of decimals to be rounded to
export const useAverage = (decimals) => {
  const [average, setAverage] = useState();
  const [array, setArray] = useState();

  useEffect(()=> {
    if(Array.isArray(array) && array.length > 0){
      let sum = 0;
      array.forEach(member => {
        sum += member
      })
      const calculatedAverage = (sum / array.length).toFixed(decimals);
      setAverage(calculatedAverage);
    }
  },[array, decimals])

  return [average, setArray];
}
