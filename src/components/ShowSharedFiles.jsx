import React, { Component } from "react";

export default class ShowSharedFiles extends Component {
  render() {
    const { ipfsSharedHashArray } = this.props.values;
    console.log(" Array inside the showshared file", ipfsSharedHashArray);

    return (
      <div>
        <h3>Shared File hashes List</h3>
        <ol>
          {ipfsSharedHashArray.map((ipfsHash) => (
            <p>
              <a
                href={`https://ipfs.infura.io/ipfs/${ipfsHash}`}
                className="list-group-item list-group-item-action"
              >
                {ipfsHash}}
              </a>
            </p>
          ))}
        </ol>
      </div>
    );
  }
}
