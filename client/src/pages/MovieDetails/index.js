import React from 'react';
import Star from '../../img/star-yellow.png';
import '../../css/style.css';
import axios from 'axios';
import Navbar from './../../components/Navbar';
import Search from './../Search';
import {Router, Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';

class MovieDetails extends React.Component {
    state = {
        title: '',
        poster_path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g',
        genre: '',
        release_date: '',
        rating: '',
        description: '',
        runtime: null
    }

    formatDate = (rawDate) => {
        let date = rawDate.split("-")
        let month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "Desember"]
        return (month[(date[1] - 1) + 1] + ' ' + date[2] + ', ' + date[0])
    }

    formatGenres = (rawGenres) => {
        let genres = '';
        let genreCount = rawGenres.length;
        if (rawGenres !== '') {
            for (let i = 0; i < genreCount; i++) {
                genres += rawGenres[i].name;
                if (i !== genreCount - 1) {
                    genres += ', ';
                }
            }
        } else {
            genres = 'loading';
        }
        return genres;
    }

    getMovieDetails = async movie_id => {
        let url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=1ee23fc1f14419752cbc767ebd6f4293&language=en-US`
        const movie = await axios.get(url)
        let date = this.formatDate(movie.data.release_date)
        let genres = this.formatGenres(movie.data.genres)
        let pp = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.data.poster_path;
        this.setState({
            poster_path: pp,
            title: movie.data.title,
            genre: genres,
            release_date: date,
            rating: movie.data.vote_average,
            description: movie.data.overview,
            runtime: movie.data.runtime
        })
    }

    componentDidMount = () => {
        this.getMovieDetails(this.props.match.params.movieId);
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.match.params.movieId !== nextProps.match.params.movieId) {
            this.getMovieDetails(nextProps.match.params.movieId);
        }
    }

    render() {
        if (this.props.isAuth) {
            return (
                <div>
                    <Navbar
                        searchMovies={this.props.searchMovies}
                        search={this.props.search}
                        isAuth={this.props.isAuth}
                    />
                    <Search
                        searching={this.props.searching}
                        query={this.props.searchQuery}
                        searchResults={this.props.searchResults}
                        resetSearchQuery={this.props.resetSearchQuery}
                    />
                    <div id="container">
                        <div id="content">
                            <div className="movie-thumbnail">
                                <div className="movie-pic">
                                    <img src={`${this.state.poster_path}`} alt="this.state.title"></img>
                                </div>
                                <div className="movie-details">
                                    <h2>{this.state.title}</h2>
                                    <p className="genre-time">{this.state.genre} | {this.state.runtime} minutes</p>
                                    <p>Released date : {this.state.release_date}</p>
                                    <p><img src={`${Star}`} className="star" alt="rating" /> {this.state.rating} / 10</p>
                                    <p className="movie-description">{this.state.description}</p>
                                </div>
                            </div>
                            <div id="schedule-review">
                                <div className="movie-schedule">
                                    <h3 id="movie-schedule-header">Schedule</h3>
                                    <table cellSpacing="0" cellPadding="0">
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Available Seats</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>November 25, 2019</td>
                                            <td>06:30 PM</td>
                                            <td>10</td>
                                            <td><Link to='/booking'>Available</Link></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }
    }
}

export default MovieDetails
