import React, { Component } from "react";
class uploadFile extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://github.com/Nour-Elgeziry/SSSDaap.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            SSSDapp
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-norap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.props.state.account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href={`https://ipfs.infura.io/ipfs/${this.props.state.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt=""
                    src={`https://ipfs.infura.io/ipfs/${this.props.state.ipfsHash}`}
                  />
                </a>
                <p>&nbsp;</p>
                <h2>Choose File</h2>
                <form onSubmit={this.props.onSubmit}>
                  <input type="file" onChange={this.props.captureFile} />
                  <input type="submit" />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default uploadFile;
