import React, { useState, useEffect } from 'react';
import AppHeader from '../header';
import Films from '../films';
import Search from '../search';
import ShowMore from '../show-more';
import noData from '../../noData.png';
import './app.css';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

const apiUrl = 'https://www.omdbapi.com/?s=dog&page=1&apikey=f9b162b1';

const App = () => {
    const [ loading, setLoading ] = useState(true);
    const [ movies, setMovies ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ totalResults, setTotalResults ] = useState(null);
    const [ searchValue, setSearchValue ] = useState('');

    useEffect(() => {
        fetch(apiUrl).then((response) => response.json()).then((jsonResponse) => {
            setMovies(jsonResponse.Search);
            setLoading(false);
            setTotalResults(jsonResponse.totalResults);
            setSearchValue('dog');
        });
    }, []);

    const search = (searchValue) => {
        setLoading(true);
        setErrorMessage(null);
        setSearchValue(searchValue);
        setTotalResults(null);

        fetch(`https://www.omdbapi.com/?s=${searchValue}&page=${1}&apikey=f9b162b1`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                if (jsonResponse.Response === 'True') {
                    setMovies(jsonResponse.Search);
                    setLoading(false);
                    setTotalResults(jsonResponse.totalResults);
                } else {
                    setErrorMessage(jsonResponse.Error);
                    setLoading(false);
                    setTotalResults(null);
                }
            });
    };

    const showPage = React.useCallback(
        (searchValue, page) => {
            // setLoading(true);
            setErrorMessage(null);

            fetch(`https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=f9b162b1`)
                .then((response) => response.json())
                .then((jsonResponse) => {
                    if (jsonResponse.Response === 'True') {
                        setMovies([ ...movies, ...jsonResponse.Search ]);
                        setLoading(false);
                        setTotalResults(jsonResponse.totalResults);
                    } else {
                        setErrorMessage(jsonResponse.Error);
                        setLoading(false);
                        setTotalResults(null);
                    }
                });
        },
        [ movies ]
    );

    const nextPage = (pag) => {
        showPage(searchValue, pag);
    };

    return (
        <div className='App'>
            <AppHeader />
            <Search className='search-container' search={search} />
            <div className='films row'>
                <div className='col-10 d-flex flex-wrap justify-content-center'>
                    {loading && !errorMessage ? (
                        <Spinner className='spinner' animation='border' variant='danger' />
                    ) : errorMessage ? (
                        <div className='errorMessage'>
                            <img className='errImg' src={noData} alt='Error' />
                            <h1 className='errMas'>{errorMessage}</h1>
                        </div>
                    ) : (
                        movies.map((movie, index) => <Films key={`${index}-${movie.Title}`} movie={movie} />)
                    )}
                </div>
            </div>
            <ShowMore className='show-more' next={nextPage} total={totalResults} />
        </div>
    );
};

export default App;
