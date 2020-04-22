import React, { Component } from "react";
import "./Main.scss";
import { UploadFile, ShareFile } from "./fileHandling/index";

const ipfsClient = require("ipfs-api");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      isShareFile: true,
    };
  }
  componentDidMount() {
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isShareFile } = this.state;

    if (isShareFile) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState((prevState) => ({
      isShareFile: !prevState.isShareFile,
    }));
    console.log("is share", this.state.isShareFile);
  }
  captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };
  };

  onSubmit = (event) => {
    const { isShareFile } = this.state;

    event.preventDefault();
    console.log("Submitting file to ipfs...");
    //1. upload file to ipfs
    ipfs.add(this.state.buffer, (error, result) => {
      const ipfsHash = result[0].hash;
      console.log("returned ipfs hash from infura", ipfsHash);

      if (error) {
        console.error(error);
        return;
      }

    
      // check if sharig or uploading file
      if (isShareFile) {
        //Sharing File

        console.log("pushing file to slected user's Shared array");
        this.props.values.contract.methods
          .shareFile(this.props.values.sharedUserAddress, ipfsHash)
          .send({ from: this.props.values.account });

        console.log("pushing file to my Shared array");
        this.props.values.contract.methods
          .shareFile(this.props.values.account, ipfsHash)
          .send({ from: this.props.values.account });
      } else {
        console.log("pushing file to my upload array");
        this.props.values.contract.methods
          .uploadFile(this.props.values.account, ipfsHash)
          .send({ from: this.props.values.account });
      }
    });
  };

  goToShowUploadedFiles() {
    const { history } = this.props;
    const { ipfsUploadedHashArray } = this.props.values;

    // Get Uploaded Files

    this.props.values.contract.methods
      .getMyFiles(this.props.values.account)
      .call()
      .then((ipfsUploadedHashArray) => {
        this.props.updateState({ ipfsUploadedHashArray });
        console.log(
          "return value from getMyFiles function",
          ipfsUploadedHashArray
        );

        console.log(
          "State result from the uploadfiles array",
          ipfsUploadedHashArray
        );
      });
    history.push("/ShowUploadedFiles");
  }

  goToShowSharedFiles() {
    const { history } = this.props;
    const { ipfsSharedHashArray } = this.props.values;

    //3. get shared files
    this.props.values.contract.methods
      .getSharedFiles(this.props.values.account)
      .call()
      .then((x) => {
        this.props.updateState({ ipfsSharedHashArray: x });
        console.log(
          "return value from getSharedFiles function",
          ipfsSharedHashArray
        );

        console.log("State resukt of the shared array", ipfsSharedHashArray);
      });

    history.push("/ShowSharedFiles");
  }

  render() {
    const { isShareFile } = this.state;
    // view on right side
    const current = isShareFile ? "Upload" : "Share";
    //Actual open window
    const currentActive = isShareFile ? "Share" : "Upload";
    return (
      <div className="Home">
        <div className="login">
          <div className="container" ref={(ref) => (this.container = ref)}>
            {!isShareFile && (
              <UploadFile
                containerRef={(ref) => (this.Registeration = ref)}
                values={this.props.values}
                onSubmit={this.onSubmit}
                captureFile={this.captureFile}
                showUploadedFiles={this.goToShowUploadedFiles.bind(this)}
              />
            )}
            {isShareFile && (
              <ShareFile
                containerRef={(ref) => (this.Registeration = ref)}
                values={this.props.values}
                valuesChange={this.props.handleChange}
                onSubmit={this.onSubmit}
                captureFile={this.captureFile}
                showSharedFiles={this.goToShowSharedFiles.bind(this)}
              />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={(ref) => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

const RightSide = (props) => {
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
