pragma solidity 0.5.0;

contract SSSDapp {
<<<<<<< HEAD
    string ipfsHash;

    function set(string memory _ipfsHash) public {
        // writing (storing) the hash to the blockchain
        ipfsHash = _ipfsHash;
    }

    function get() public view returns (string memory) {
        // reading from the blockchain
        return ipfsHash;
    }
}
=======
 string ipfsHash;

  function set(string memory _ipfsHash) public {
    ipfsHash = _ipfsHash;
  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
}
>>>>>>> bba824979674985594ca32d0368400240e6f4b73
