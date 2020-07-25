import React from 'react';
import { withRouter, Redirect, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './style-login.css';

class Login extends React.Component {
    state = {
        email: "",
        isAuth: false,
        userData: [],
        userId: null
    }

    validateUser = async email => {
        let url = `http://engima.tannaga.com:9090/api/user/checkemail?email=${email}`
        axios.get(url)
            .then(res => {
                if (res.data.length > 0 && this.state.password === res.data[0].password) {
                    this.setState({ userData: res.data })
                    this.setState({ isAuth: true })
                }
            }).then(() => this.handleValidation())
    }

    handleValidation = () => {
        if (this.state.isAuth) {
            this.props.changeAuth(true);
            this.props.setUser(this.state.userData[0].username);
            this.props.setUserId(this.state.userData[0].id_user);
            this.props.history.push('/');
        } else {
            this.setState({ userData: [] })//setUserData([]);
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.validateUser(this.state.email);
    }

    setEmail = async e => {
        e.preventDefault()
        await this.setState({ email: e.target.value })
    }

    setPassword = async e => {
        e.preventDefault()
        await this.setState({ password: e.target.value })
    }

    render() {
        if (this.props.isAuth) {
            return null;
        } else {
            return (
                <Route render={props =>
                    !(props.isAuth) ? (
                        <div id="login-container">
                            <div id="login-greetings">
                                Welcome to <b>Engi</b>ma!
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="container-form">
                                    <label htmlFor="email" className='label'><b>Email</b></label>
                                    <input
                                        type="text"
                                        placeholder="john@doe.com"
                                        name="email"
                                        onChange={this.setEmail}
                                    ></input>
                                </div>
                                <div className="container-form">
                                    <label htmlFor="psw" className='label'><b>Password</b></label>
                                    <input
                                        type="password"
                                        placeholder="place here"
                                        name="psw"
                                        onChange={this.setPassword}
                                    ></input>
                                </div>
                                <div id='container-submit'>
                                    <button type="submit" name="log_user">Login</button>
                                </div>
                                <div id="message">
                                    Don't have an account?
                                    <Link to='/register'>Register here</Link>
                                </div>
                            </form>
                        </div>
                    ) : (
                            <Redirect to={{
                                pathname: '/',
                                state: { from: this.props.location }
                            }} />
                        )
                } />

            )
        }
    }
}

export default withRouter(Login);
