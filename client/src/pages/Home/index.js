import React from 'react'
import MovieThumbnails from '../../components/MovieThumbnails'
import Navbar from './../../components/Navbar';
import Search from './../Search';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
    if (props.isAuth) {
        return (
            <div>
                <Navbar
                    searchMovies={props.searchMovies}
                    search={props.search}
                    isAuth={props.isAuth}
                />
                <Search
                    searching={props.searching}
                    query={props.searchQuery}
                    searchResults={props.searchResults}
                    resetSearchQuery={props.resetSearchQuery}
                />
                <div id="container">
                    <div id="content">
                        <div id="greetings">
                            <h2>Hello, <mark className="blue">{props.username}</mark>!</h2>
                        </div>
                    </div>
                    <div id="movies-now-played">
                        <div>
                            <h3 id="now-playing">Now playing</h3>
                        </div>
                    </div>
                    <MovieThumbnails />
                </div>
            </div>
        )
    } else {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }
}

export default Home
