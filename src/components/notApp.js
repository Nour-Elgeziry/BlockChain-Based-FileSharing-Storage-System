import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import SSSDapp from "../abis/SSSDapp.json";
import RegisterUser from "./App";

const ipfsClient = require("ipfs-api");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
}); // leaving out the arguments will default to these values

class notApp extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  // get the account
  //get the Network
  //get ipfsHash
  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts(); // get account and return array
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId(); // getting network id
    console.log(networkId);
    const networkData = SSSDapp.networks[networkId];
    if (networkData) {
      // Fetching contract
      const contract = web3.eth.Contract(SSSDapp.abi, networkData.address);
      console.log(contract);
      this.setState({ contract });
      const ipfsHash = await contract.methods.get().call();
      console.log("the hash:", ipfsHash);
      this.setState({ ipfsHash });
    } else {
      window.alert(
        "Smart contract not deployed on Ganache to detected network."
      );
    }
  }

  // setting web3 to connect to block chain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      buffer: null,
      contract: null,
      ipfsHash: " ",
      registerUsername: "",
      registeEmail: "",
      registerPassword: "",
      registerUserID: 0
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  registerUser = event => {
    console.log(this.state.registerUsername);
    event.preventDefault();
    console.log(
      this.state.contract.methods
        .registerUser(
          this.state.registerUserID,
          this.state.registerUsername,
          this.state.registerEmail,
          this.state.registerPassword
        )
        .send({ from: this.state.account })
    );
    this.props.history.push("/SignIn");
    this.setState({ userID: this.state.registerUserID + 1 });
  };

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

      if (error) {
        console.error(error);
        return;
      }
      //2. store file on blockchain
      this.state.contract.methods
        .set(ipfsHash)
        .send({ from: this.state.account })
        .then(r => {
          this.setState({ ipfsHash });
        });
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
          <ul className="navbar-nav px-3">
            <li className="nav-item text-norap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
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
                    alt=""
                    src={`https://ipfs.infura.io/ipfs/${this.state.ipfsHash}`}
                  />
                </a>
                <p>&nbsp;</p>
                <h2>Choose File</h2>
                <form onSubmit={this.onSubmit}>
                  <input type="file" onChange={this.captureFile} />
                  <input type="submit" />
                </form>
                <RegisterUser
                  registeruser={this.registerUser}
                  handlechange={this.handleChange}
                />
                <h3>Your user id is: {this.registerUserID}</h3>
                <h3>Your username is: {this.registerUsername}</h3>
                <h3>Your email is: {this.registerEmail}</h3>
                <h3>Your password is: {this.registerPassword}</h3>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default notApp;
