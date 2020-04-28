import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Web3 from "web3";
import SSSDapp from "../abis/SSSDapp.json";

import Home from "./Home";
import Dashboard from "./Dashboard";
import ShowUploadedFiles from "./ShowUploadedFiles";
import ShowSharedFiles from "./ShowSharedFiles";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      buffer: null,
      contract: null,
      ipfsHash: "",
      ipfsUploadedHashArray: [],
      ipfsSharedHashArray: [],
      isLogginActive: true,
      isAccessGranted: false,
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      signinUsername: "",
      signinPassword: "",
      sharedUserAddress: "",
    };
  }
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

    const networkData = SSSDapp.networks[networkId];
    if (networkData) {
      // Fetching contract
      const contract = web3.eth.Contract(SSSDapp.abi, networkData.address);

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

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          {" "}
          <Switch>
            <Route
              exact
              path={"/"}
              render={(props) => (
                <Home
                  {...props}
                  state={this.state}
                  handleChange={this.handleChange}
                />
              )}
            />
            <Route
              exact
              path={"/Dashboard"}
              render={(props) => (
                <Dashboard
                  {...props}
                  values={this.state}
                  updateState={this.setState.bind(this)}
                  handleChange={this.handleChange}
                />
              )}
            />

            <Route
              exact
              path={"/ShowUploadedFiles"}
              render={(props) => (
                <ShowUploadedFiles {...props} values={this.state} />
              )}
            />

            <Route
              exact
              path={"/ShowSharedFiles"}
              render={(props) => (
                <ShowSharedFiles {...props} values={this.state} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
