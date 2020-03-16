pragma solidity >=0.4.21 <0.6.0;
<<<<<<< HEAD
// Contract responsible for adding new contracts to blockchain
=======

>>>>>>> bba824979674985594ca32d0368400240e6f4b73
contract Migrations {
  address public owner;
  uint public last_completed_migration;

  constructor() public {
    owner = msg.sender;
  }

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public restricted {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
