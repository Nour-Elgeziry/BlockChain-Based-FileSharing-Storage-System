import React from "react";
//import loginImg from "../../login.svg";

export class Registeration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="registerUsername"
                placeholder="username"
                value={this.props.values.registerUsername}
                onChange={this.props.valuesChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="registerEmail"
                placeholder="email"
                value={this.props.values.registerEmail}
                onChange={this.props.valuesChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="registerPassword"
                placeholder="password"
                value={this.props.values.registerPassword}
                onChange={this.props.valuesChange}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            type="button"
            className="btn"
            onClick={this.props.registerFunction}
          >
            Register
          </button>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.props.getUser}>
            Get user (test)
          </button>
        </div>
      </div>
    );
  }
}
