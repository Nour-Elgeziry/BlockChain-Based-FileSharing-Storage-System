import React, { Component } from "react";

class Signin extends Component {
  render() {
    return (
      <body className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputuserID" className="sr-only">
            User ID
          </label>
          <input
            type="text"
            name="signInUserID"
            id="inputuserID"
            className="form-control"
            placeholder="ID"
            value={this.props.state.signInUserID}
            onChange={this.props.handleChange}
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="signInPassword"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={this.props.state.signInPasswordpassword}
            onChange={this.props.handleChange}
            required
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.props.signIn}
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
        </form>
        <h3>Your password is: {this.props.state.signInPassword}</h3>
      </body>
    );
  }
}

export default Signin;
