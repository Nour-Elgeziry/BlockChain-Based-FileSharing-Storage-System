import React, { Component } from "react";
import "./App.css";

const ipfsClient = require("ipfs-api");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
}); // leaving out the arguments will default to these values

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      ipfsHash: "QmZ6uihQtNFE1bGB8o3edaHGzQBm7NwHcJm4kvHM6rbXft"
    };
  }
  captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };

  onSubmit = event => {
    event.preventDefault();
    console.log("Submitting file to ipfs...");
    //1. upload file to ipfs
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("Ipfs result", result);
      const ipfsHash = result[0].hash;
      this.setState({ ipfsHash });
      if (error) {
        console.error(error);
        return;
      }
      //2. store fileon blockchain
    });
  };
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
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`}
                  />
                </a>
                <p>&nbsp;</p>
                <h2>Change File</h2>
                <form onSubmit={this.onSubmit}>
                  <input type="file" onChange={this.captureFile} />
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

export default App;
