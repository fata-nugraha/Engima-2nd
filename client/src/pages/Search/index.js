import React from 'react'
import Star from '../../img/star-yellow.png'
import { Router, Link } from 'react-router-dom';

const Search = (props) => {
    if (props.searching) {
        let default_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g'
        let res = props.searchResults;
        let items = props.searchResults.map((item) =>
            <div key={item.id} className="search-thumbnail">
                <div className="search-pic">
                    <img src={(item.poster_path != null) ? 
                        `http://image.tmdb.org/t/p/w185/${item.poster_path}` 
                        : default_img } 
                        alt="item.title"/>
                </div>
                <div className="search-details">
                    <h3>{item.title}</h3>
                    <p><img src={`${Star}`} className="star" alt="rating" />{item.vote_average}</p>
                    <p className="search-description">{(item.overview.length > 200) ? item.overview.substr(0, 200) + '...' : item.overview}</p>
                    <Link to={`/details/${item.id}`} onClick={props.resetSearchQuery}><span className="view-details">View details</span></Link>
                </div>
            </div>
        )
        let movieCount = res.length
        if (movieCount > 0) {
            return (
                <div id="search-container">
                    <div id="content">
                        <p id="show-keyword"><b>Showing search result for keyword {props.query}</b></p>
                        <p id="show-count">{movieCount} results available</p>
                        {items}
                    </div>
                </div >
            )
        } else {
            return (
                <div id="search-container">
                    <div id="content">
                        <p id="show-keyword"><b>Showing search result for keyword {props.query}</b></p>
                        <p id="show-count">0 results available</p>
                    </div>
                </div >
            )
        }
    } else {
        return null
    }
}

export default Search
