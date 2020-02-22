pragma solidity 0.5.0;

contract SSSDapp {
 string ipfsHash;

  function set(string memory _ipfsHash) public {
    ipfsHash = _ipfsHash;
  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
}