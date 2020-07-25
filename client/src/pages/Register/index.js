import React from 'react'

class Register extends React.Component {
    state = {
        username: '',
        email: '',
        phone: '',
        password: '',
        cf_password: '', 
    }

    setUsername = async e => {
        e.preventDefault()
        await this.setState({ username: e.target.value })
    }

    setEmail = async e => {
        e.preventDefault()
        await this.setState({ email: e.target.value })
    }

    setPhone = async e => {
        e.preventDefault()
        await this.setState({ phone: e.target.value })
    }

    setPassword = async e => {
        e.preventDefault()
        await this.setState({ password: e.target.value })
    }

    setCfPassword = async e => {
        e.preventDefault()
        await this.setState({ cf_password: e.target.value })
    }

    render() {
        return (
            <div id="login-container">
                <div id="login-greeting">
                    Welcome to <b>Engi</b>ma!
                </div>
                <form>
                    <div className="container-form">
                        <div className="label"><b>Username</b></div>
                        <input type="text"
                            placeholder="john.johndoe"
                            required 
                            onChange={this.seUsername}/>
                    </div>
                    <div className="container-form">
                        <div className="label"><b>Email Address</b></div>
                        <input type="text"
                            placeholder="joe@email.com"
                            required />
                    </div>
                    <div className="container-form">
                        <div className="label"><b>Phone Number</b></div>
                        <input type="text"
                            placeholder="+62813xxxxxxxx"
                            required />
                    </div>
                    <div className="container-form">
                        <div className="label"><b>Password</b></div>
                        <input type="password"
                            placeholder="make as strong as possible"
                            required />
                    </div>
                    <div className="container-form">
                        <div className="label"><b>Confirm Password</b></div>
                        <input type="password"
                            placeholder="same as above"
                            required />
                    </div>
                    <div id="container-submit">
                        <button type="submit" name="reg_user" id="btn-submit">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register
