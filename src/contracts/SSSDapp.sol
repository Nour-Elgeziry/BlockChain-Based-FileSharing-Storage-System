pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract SSSDapp {
    string ipfsHash;

    function set(string memory _ipfsHash) public {
        // writing (storing) the hash to the blockchain
        ipfsHash = _ipfsHash;
    }

    function get() public view returns (string memory) {
        // reading from the blockchain
        return ipfsHash;
    }
    /*creat object that stores the following:
    
    1. user name * 
    2. email            set when user registers
    3. password *
    4. MyFiles // alterded when 1.user uploads file , stores the file hash(set) 2. user loggs in, returns ipfsHash(get)
    5. SharedFiles // altered whenother users share files , user inputs shared file hashes here.
     */

    struct Users {
        string userName;
        string email;
        string password;
        string[] myFiles;
        string[] sharedFiles;
    }

    mapping(uint256 => Users) public Profiles; // holds list of users
    uint256[] public userProfiles;

    //Seter functions (use methods.send)

    // function to add users
    function registerUser(
        uint256 userID,
        string memory _userName,
        string memory _email,
        string memory _password
    ) public {
        Users storage users = Profiles[userID];
        users.userName = _userName;
        users.email = _email;
        users.password = _password;
        userProfiles.push(userID);
    }

    // function to upload files
    function uploadFile(uint256 _userID, string memory _Hash) public {
        Profiles[_userID].myFiles.push(_Hash);
    }

    //function to share files
    function sharedFile(uint256 _userID, string memory _Hash) public {
        Profiles[_userID].sharedFiles.push(_Hash);
    }

    // getter functions (use methods.call)
    // function to get number of users
    function getUsersNumber() public view returns (uint256[] memory) {
        return userProfiles;
    }

    //function get specific user
    function getUser(uint256 userID)
        public
        view
        returns (string memory, string memory, string[] memory)
    {
        return (
            Profiles[userID].userName,
            Profiles[userID].email,
            Profiles[userID].myFiles
        );
    }
    // Signing in function
    function signIn(uint256 _userID, string memory _password)
        public
        returns (bool)
    {
        if (
            keccak256(abi.encodePacked(Profiles[_userID].password)) ==
            keccak256(abi.encodePacked(_password))
        ) {
            return true;
        } else {
            return false;
        }

    }

}
