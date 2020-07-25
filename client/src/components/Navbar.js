import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './../css/style.css';

class Navbar extends React.Component {
    state = {
        search: ''
    }

    onChange = async e => {
        e.preventDefault()
        await this.setState({ search: e.target.value })
        this.props.searchMovies(this.state.search)
    }

    render() {
        if (this.props.isAuth) {
            return (
                <header>
                    <div id="navbar">
                        <form onSubmit={this.onSubmit} id="search-engine">
                            <span id="title">
                                <Link to="/">
                                    <h3><mark className="blue">Engi</mark><mark className="black">ma</mark></h3>
                                </Link>
                            </span>
                            <input type="text" name="search" placeholder="Search movie" value={this.state.search} onChange={(e) => this.onChange(e)}></input>
                            <span id="nav">
                                <Link to='/transactions'><span className='a-nav'>Transactions</span></Link>
                                <Link to='/logout'><span className='a-nav'>Logout</span></Link>
                            </span>
                        </form>
                    </div>
                </header>
            )
        } else {
            return null;
        }
    }
}

export default Navbar
