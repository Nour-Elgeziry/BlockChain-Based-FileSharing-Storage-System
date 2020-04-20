import React, { Component } from "react";
export class ShareFile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Share Files</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <h2>Choose File to Share</h2>

              

              <input type="file" onChange={this.props.captureFile} />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="sharedUserAddress"
                placeholder="User Address"
                value={this.props.values.sharedUserAddress}
                onChange={this.props.valuesChange}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={this.props.onSubmit}>
            Share
          </button>

          <button
            type="button"
            className="btn"
            onClick={this.props.showSharedFiles}
          >
            Show Files
          </button>
        </div>
      </div>
    );
  }
}
