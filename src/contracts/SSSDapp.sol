pragma solidity ^0.5.0;

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

    uint256 NextuserID;
    mapping(uint256 => Users) public Profiles; // holds list of users
    uint256[] public userProfiles;

    // function to add users
    function addUser(
        uint256 userID,
        string memory _userName,
        string memory _email,
        string memory _password
    ) public returns (uint256) {
        Users storage users = Profiles[userID];
        users.userName = _userName;
        users.email = _email;
        users.password = _password;
        userProfiles.push(userID);
        return userID;
    }

    // function to upload files
    function uploadFile(uint256 _userID, string memory _Hash)
        public
        returns (string memory)
    {
        Profiles[_userID].myFiles.push(_Hash);
        return Profiles[_userID].myFiles[_userID];
    }

    //function to share files
    function shareFile(uint256 userID, string memory _Hash) public {
        Profiles[userID].sharedFiles.push(_Hash);

    }

}
