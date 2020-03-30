import React, { Component } from "react";
export class UploadFile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Upload Files</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <a
                href={`https://ipfs.infura.io/ipfs/${this.props.values.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
              ></a>
              <h2>Choose File to Upload</h2>

              <input type="file" onChange={this.props.captureFile} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.props.onSubmit}>
            Upload
          </button>
        </div>
      </div>
    );
  }
}
