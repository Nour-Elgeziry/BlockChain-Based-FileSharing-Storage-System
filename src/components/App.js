import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Web3 from "web3";
import SSSDapp from "../abis/SSSDapp.json";

import Home from "./Home";
import Dashboard from "./Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      buffer: null,
      contract: null,
      ipfsHash: " ",
      isLogginActive: true,
      isAccessGranted: false,
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      signinUsername: "",
      signinPassword: "",
      sharedUserAddress: ""
    };
  }
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts(); // get account and return array
    console.log("list of accounts", accounts);
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
              render={props => (
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
              render={props => (
                <Dashboard
                  {...props}
                  values={this.state}
                  updateState={this.setState}
                  handleChange={this.handleChange}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

/* goToSignIn = () => {
    console.log("i am at the function");
    this.props.history.push("/UploadFile");
  };

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
    console.log("list of accounts", accounts);
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

  //constructor(props) {
  //super(props); this.state
  state = {
    account: "",
    buffer: null,
    contract: null,
    ipfsHash: " ",
    registerUsername: "",
    registerEmail: "",
    registerPassword: "",
    registerUserID: 0,
    signInUserName: "",
    signInPassword: "",
    signInpath: ""
  };
  //}

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  registerUser = event => {
    event.preventDefault();

    console.log(
      this.state.contract.methods
        .registerUser(
          this.state.account,
          this.state.registerUsername,
          this.state.registerEmail,
          this.state.registerPassword
        )
        .send({ from: this.state.account })
    );
    console.log(this.state.contract.methods.getUser(this.state.account).call());

    //this.history.push("/SignIn");
  };

  signIn = event => {
    let currentComponent = this;
    event.preventDefault();
    console.log("I am here");
    this.state.contract.methods
      .signIn(
        this.state.account,
        this.state.signInUserName,
        this.state.signInPassword
      )
      .call()
      .then(function(x) {
        const access = x;
        if (access === "access granted") {
          console.log("hello");
          currentComponent.setState({ signInpath: "/UploadFile" });
          console.log(
            "did the state change",
            currentComponent.state.signInpath
          );
          // currentComponent.props.push("/UploadFile");

          //this.props.history.push("/UploadFile");

          // this.history.push("/SignIn");
        } else {
          console.log("by bye");
        }
      });
  };

  /*  (function() {
      if ("Notification" in window) {
        var permission = Notification.permission;

        if (permission === "denied" || permission === "granted") {
          return;
        }

        Notification.requestPermission().then(function() {
          var notification = new Notification("the acess", access);
        });
      }
    })();
  
   

  // if (access =="access granted"){

  // }

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
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={history => (
                <div>
                  <UserRegestration
                    state={this.state}
                    handleChange={this.handleChange}
                    registerUser={this.registerUser}
                  />

                  <Link to="/SignIn">
                    <button
                      className="btn btn-lg btn-primary btn-block"
                      type="button"
                    >
                      Next
                    </button>
                  </Link>
                </div>
              )}
            />
            <Route
              exact
              path="/SignIn"
              render={() => (
                <div>
                  <Signin
                    state={this.state.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                    signIn={this.signIn.bind(this)}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/UploadFile"
              render={() => (
                <div>
                  <UploadFile
                    onSubmit={this.onSubmit}
                    captureFile={this.captureFile}
                    state={this.state}
                  />
                </div>
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


*/
