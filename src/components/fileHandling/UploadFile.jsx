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
              <h2>Choose File to Upload</h2>

              <input type="file" name = "name" onChange={this.props.captureFile} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.props.onSubmit}>
            Upload
          </button>

          <button type="button" className="btn" onClick={this.props.showUploadedFiles}>
            Show Files
          </button>
        </div>
      </div>
    );
  }
}

