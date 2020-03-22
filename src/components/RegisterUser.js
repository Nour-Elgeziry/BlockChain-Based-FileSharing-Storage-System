import React, { Component } from "react";
class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", email: "", password: "" };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  AddUser = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <body class="text-center">
        <form class="form-signin">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <label for="inputUsername" class="sr-only">
            User Name
          </label>
          <input
            type="text"
            name="username"
            id="inputuserName"
            class="form-control"
            placeholder="User Name"
            value={this.state.username}
            onChange={this.handleChange}
            required
            autofocus
          />
          <label for="inputEmail" class="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            value={this.state.email}
            onChange={this.handleChange}
            required
            autofocus
          />
          <label for="inputPassword" class="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.AddUser}
          >
            Add User
          </button>
        </form>
        <h3>Your username is: {this.state.username}</h3>
        <h3>Your email is: {this.state.email}</h3>
        <h3>Your password is: {this.state.password}</h3>
      </body>
    );
  }
}

export default RegisterUser;
