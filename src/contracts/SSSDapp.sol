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
        //mapping(uint256 => myFiles) MyFiles; // holds list of user files
        //mapping(uint256 => sharedFiles) SharedFiles; // holds list of shared files
    }
    struct myFiles {
        string Hash;
    }
    struct sharedFiles {
        string Hash;
    }

    uint256 userID = 0;
    uint256 fileNumber;
    mapping(uint256 => Users) public Profiles; // holds list of users

    // function to add users
    function addUser(
        string memory _userName,
        string memory _email,
        string memory _password
    ) public returns (string memory) {
        Users storage users = Profiles[userID];
        users.userName = _userName;
        users.email = _email;
        users.password = _password;
        userID++;
        //uint256 id = userID;
        return users.userName;
    }
    // function to upload files
    function uploadFile(string memory _userName, string memory _Hash)
        public
        returns (string memory)
    {
        Users storage users = Profiles[userID];
        users.userName = _userName;
        users.myFiles.push(_Hash);
        return users.myFiles[0];

    }

    //function to share files
    function shareFile(string memory _userName, string memory _Hash) public {
        Users storage users = Profiles[userID];
        users.userName = _userName;
        users.sharedFiles.push(_Hash);

    }

    /* 

    function start(bytes32 userName, bytes32 email, bytes32 Hash)
        public
        returns (uint256 id)
    {
        struct SSSDapp.Users storage pointer user = Profiles[userID];

        userID++;

    }*/

}
