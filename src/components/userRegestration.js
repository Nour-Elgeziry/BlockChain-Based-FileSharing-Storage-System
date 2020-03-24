import React, { Component } from "react";
class userRegestration extends Component {
  render() {
    return (
      <body className="text-center">
        <form className="form-register">
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
          <label htmlFor="inputUsername" className="sr-only">
            User Name
          </label>
          <input
            type="text"
            name="registerUsername"
            id="inputuserName"
            className="form-control"
            placeholder="User Name"
            value={this.props.state.registerUsername}
            onChange={this.props.handleChange}
            required
            autoFocus
          />
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="registerEmail"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={this.props.state.registerEmail}
            onChange={this.props.handleChange}
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="registerPassword"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={this.props.state.registerPassword}
            onChange={this.props.handleChange}
            required
          />

          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.props.registerUser}
          >
            Register
          </button>
        </form>

        <h3>Your Register username is : {this.props.state.registerUsername}</h3>
        <h3>Your Register pasword is : {this.props.state.registerPassword}</h3>
      </body>
    );
  }
}

export default userRegestration;
