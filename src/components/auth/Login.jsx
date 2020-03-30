import React from "react";

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="signinUsername"
                placeholder="username"
                value={this.props.values.signinUsername}
                onChange={this.props.valuesChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="signinPassword"
                placeholder="password"
                value={this.props.values.signinPassword}
                onChange={this.props.valuesChange}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            type="button"
            className="btn"
            onClick={this.props.signinFunction}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}
