import React from 'react';
import './App.css';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login';
import Logout from './components/Logout';
import Booking from './pages/Booking';
import Transactions from './pages/Transactions';
import Register from './pages/Register';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  state = {
    searching: false,
    searchQuery: '',
    searchResults: [],
    isAuth: false,
    username: 'guest',
    id: null
  }

  searchMovies = async search => {
    this.setState({ searchQuery: search });
    if (search !== '') {
      this.setState({ searching: true })
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=1ee23fc1f14419752cbc767ebd6f4293&query=${search}}&page=1&include_adult=false`
      );
      this.setState({ searchResults: res.data['results'] });
    } else {
      this.setState({ searching: false });
      this.setState({ searchResults: [] });
    }
  }

  changeAuth = auth => {
    this.setState({ isAuth: auth });
  }

  setUser = user => {
    this.setState({ username: user });
  }

  setUserId = id => {
    this.setState({ id: id });
  }

  resetSearchQuery = () => {
    this.setState({ searchQuery: '', searching: false })
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact path="/"
              render={() => <Home
                searching={this.state.searching}
                username={this.state.username}
                isAuth={this.state.isAuth}
                searchMovies={this.searchMovies}
                query={this.state.searchQuery}
                searchResults={this.state.searchResults}
                resetSearchQuery={this.resetSearchQuery}
              />}
            />
            <Route
              path="/details/:movieId"
              render={(props) => <MovieDetails
                {...props}
                isAuth={this.state.isAuth}
                searching={this.state.searching}
                username={this.state.username}
                searchMovies={this.searchMovies}
                query={this.state.searchQuery}
                searchResults={this.state.searchResults}
                resetSearchQuery={this.resetSearchQuery}
              />}
            />
            <Route path="/login"
              render={() => <Login
                isAuth={this.state.isAuth}
                changeAuth={this.changeAuth}
                setUser={this.setUser}
                setUserId={this.setUserId}
              />}
            />
            <Route path="/logout"
              render={() => <Logout
                isAuth={this.state.isAuth}
                changeAuth={this.changeAuth}
              />}
            />
            <Route path="/booking"
              render={() => <Booking />
              }
            />
            <Route path="/transactions"
              render={() => <Transactions
                searching={this.state.searching}
                username={this.state.username}
                isAuth={this.state.isAuth}
                searchMovies={this.searchMovies}
                query={this.state.searchQuery}
                searchResults={this.state.searchResults}
                resetSearchQuery={this.resetSearchQuery}
              />
              }
            />
            <Route path="/register"
              render={() => <Register />
              }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
