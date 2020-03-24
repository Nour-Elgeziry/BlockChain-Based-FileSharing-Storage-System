import React, { Component } from "react";
import SSSDapp from "../abis/SSSDapp.json";
import Web3 from "web3";
class Signin extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

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
      password: "",
      userID: 0
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  signIn = event => {
    event.preventDefault();
    const signedin = this.state.contract.methods
      .signIn(this.state.userID, this.state.password)
      .call();

    const thebool = Boolean(signedin);
    console.log(thebool);
  };

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
            name="userID"
            id="inputuserID"
            className="form-control"
            placeholder="ID"
            value={this.state.userID}
            onChange={this.handleChange}
            required
            autoFocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.signIn}
          >
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2019-2020</p>
        </form>
        <h3>Your password is: {this.state.password}</h3>
      </body>
    );
  }
}

export default Signin;
