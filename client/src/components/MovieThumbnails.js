import React, { Component } from 'react'
import './../css/style.css';
import Star from '../img/star-yellow.png'
import { BrowserRouter as Router, Link } from 'react-router-dom';

export class MovieThumbnails extends Component {
    state = {
        results: []
    }

    getDateMax() {
        let dmax = new Date();
        dmax.setDate(dmax.getDate() + 7)
        let date = ("0" + dmax.getDate()).slice(-2)
        let month = ("0" + (dmax.getMonth() + 1)).slice(-2)
        let year = dmax.getFullYear()
        console.log(year + '-' + month + '-' + date)
        return (year + '-' + month + '-' + date)
    }

    getDateMin() {
        let dmin = new Date();
        dmin.setDate(dmin.getDate())
        let date = ("0" + dmin.getDate()).slice(-2)
        let month = ("0" + (dmin.getMonth() + 1)).slice(-2)
        let year = dmin.getFullYear()
        console.log(year + '-' + month + '-' + date)
        return (year + '-' + month + '-' + date)
    }

    render() {
        let items = this.state.results.map((item) =>
            <div key={item[3]} className="thumbnail">
                <Link to={`/details/${item[3]}`}>
                    <img src={item[1]} alt="item[0]" />
                    <h5>{item[0]}</h5>
                </Link>
                <h5><img src={`${Star}`} className="star" alt="rating" /> {item[2]}</h5>
            </div>

        )

        console.log(this.state.results)
        return (
            <div>
                {items}
            </div>
        )
    }

    fetchApi(url) {
        fetch(url).then(res => res.json()).then((query) => {
            console.log(query)
            console.log(url)
            let movies = [];
            for (let i = 0; i < 10; i++) {
                let id = query.results[i].id
                let pp ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
                if (query.results[i].poster_path !== null) {
                    pp = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + query.results[i].poster_path
                }
                let title = query.results[i].title
                if (title.length > 20) {
                    title = title.substr(0, 17) + '...'
                }

                movies.push([title, pp, query.results[i].vote_average, id])
            }
            this.setState({
                results: movies
            })
        })
    }

    componentDidMount() {
        let dmin = this.getDateMin();
        let dmax = this.getDateMax();
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=1ee23fc1f14419752cbc767ebd6f4293&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${dmin}&primary_release_date.lte=${dmax}`
        this.fetchApi(url)
    }

    getInitialState() {
        let initialState = []
        for (let i = 0; i < 10; i++) {
            initialState.push(['Loading...', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g', 0, 0], [0])
        }

        return initialState
    }
}

export default MovieThumbnails
