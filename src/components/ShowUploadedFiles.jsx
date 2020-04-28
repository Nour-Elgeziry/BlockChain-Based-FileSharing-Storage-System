import React, { Component } from "react";

export default class ShowUploadedFiles extends Component {
  render() {
    const { ipfsUploadedHashArray } = this.props.values;
    

    return (
      <div>
        <h3>Uploaded File hashes List</h3>

        <ol>
          {ipfsUploadedHashArray.map((ipfsHash) => (
            <p>
              <a
                href={`https://ipfs.infura.io/ipfs/${ipfsHash}`}
                className="list-group-item list-group-item-action"
              >
                {ipfsHash}
              </a>
            </p>
          ))}
        </ol>
      </div>
    );
  }
}
