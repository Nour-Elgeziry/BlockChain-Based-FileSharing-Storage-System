import React, { Component } from "react";
import "./Home.scss";
import { Login, Registeration } from "./auth/index";
import Web3 from "web3";
import SSSDapp from "../abis/SSSDapp.json";

const ipfsClient = require("ipfs-api");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isregistered: false,
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
      signinPassword: ""
    };
  }
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
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

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  registerUser() {
    this.state.contract.methods
      .registerUser(
        this.state.account,
        this.state.registerUsername,
        this.state.registerEmail,
        this.state.registerPassword
      )
      .send({ from: this.state.account });

    console.log(this.state.contract.methods.getUser(this.state.account).call());
    //this.props.history.push("/Dashboard");
  }

  signinUser() {
    const { history } = this.props;
    console.log("I am here");
    this.state.contract.methods
      .signIn(
        this.state.account,
        this.state.signinUsername,
        this.state.signinPassword
      )
      .call()
      .then(function(x) {
        const access = x;
        if (access === "access granted") {
          console.log("hello");
          history.push("/Dashboard");
        } else {
          console.log("by bye");
        }
      });
  }
  render() {
    const { isLogginActive } = this.state;

    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";

    return (
      <div className="Home">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login
                containerRef={ref => (this.current = ref)}
                values={this.state}
                valuesChange={this.handleChange}
                signinFunction={this.signinUser.bind(this)}
              />
            )}
            {!isLogginActive && (
              <Registeration
                containerRef={ref => (this.Registeration = ref)}
                values={this.state}
                valuesChange={this.handleChange}
                registerFunction={this.registerUser.bind(this)}
              />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

/*<div className="container" ref={ref => (this.container = ref)}>
          {isAccessGranted && (
            <UploadFile containerRef={ref => (this.current = ref)} />
          )}
        </div> */
