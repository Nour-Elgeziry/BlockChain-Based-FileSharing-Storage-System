import React, { Component } from "react";
import SSSDapp from "../abis/SSSDapp.json";
import Web3 from "web3";
class RegisterUser extends Component {
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
    this.state = { username: "", email: "", password: "", userID: 0 };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  /*AddUser = () => {
    this.props.history.push("/");
  };*/

  addingUser = event => {
    event.preventDefault();
    this.setState({ userID: this.state.userID + 1 });
    console.log(this.state.userID);
    let userid = this.state.contract.methods
      .addUser(
        this.state.userID,
        this.state.username,
        this.state.email,
        this.state.password
      )
      .call();
    console.log("this is the user info: ", userid);
  };

  uploadFile = event => {
    event.preventDefault();
    let uploadedHash = this.state.contract.methods.uploadFile(
      this.state.userID,
      "xxxhhh"
    );
    console.log("the array contents : ", uploadedHash);
  };

  render() {
    return (
      <body className="text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Register</h1>
          <label htmlFor="inputUsername" className="sr-only">
            User Name
          </label>
          <input
            type="text"
            name="username"
            id="inputuserName"
            className="form-control"
            placeholder="User Name"
            value={this.state.username}
            onChange={this.handleChange}
            required
            autoFocus
          />
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            value={this.state.email}
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
            onClick={this.addingUser}
          >
            Add User
          </button>

          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={this.uploadFile}
          >
            uploadFile
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
