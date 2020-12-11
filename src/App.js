import React, {useEffect, useRef, useLayoutEffect, useCallback} from 'react';
import classes from './App.css';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import Content from './containers/Content/Content';
import './App.css';
import gsap from 'gsap';
import {useMovieData} from './util/util'
import {useParams} from 'react-router-dom'

const App = props => {
  const [selectedMovieData, setMovieID, errorState] = useMovieData();
  const courtain = useRef("");
  let {movieId} = useParams()
  const MemoFooter = React.memo(Footer)

  useEffect(()=> {
    if(movieId === undefined){ //Default movie to be shown
      movieId = "76341"
    }
    if(movieId !== selectedMovieData.id){ //If the param id does not match the selection means user used browser history, load the corresponding data
      setMovieID(movieId)
    }
  },[movieId])

  useLayoutEffect(() => {
    // Animation for the background
    gsap.fromTo(
      courtain.current,
      { backgroundColor: "rgba(0,0,0,1)" },
      { duration: 5, backgroundColor: "rgba(0,0,0,0)" }
    );
  }, [selectedMovieData]);

  const requestMovieData = useCallback((id) => {
    setMovieID(id);
  });
 
  const content = errorState.error ? (
    <h1>{errorState.message}</h1>
  ) : (
    <Content
      movieData={selectedMovieData}
      requestMovieData={requestMovieData}
    ></Content>
  );

  return (
    <div
      className={classes.Background}
      style={
        selectedMovieData
          ? {
              backgroundImage:
                "url(https://image.tmdb.org/t/p/original/" +
                selectedMovieData.backdrop_path +
                ")",
            }
          : null
      }
    >
      <div className={classes.Shadow}>
        <div ref={courtain} className={classes.Courtain}>
          <div id="container" className={classes.Container}>
            <Search
              requestMovieData={requestMovieData}
            ></Search>
            {selectedMovieData ? content : null}
            <MemoFooter />
          </div>
        </div>
      </div>
    </div>
  );

}

export default App;
//