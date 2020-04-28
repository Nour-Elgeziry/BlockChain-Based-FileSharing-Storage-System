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
    
    1. user name           set when user registers
    2. email            set when user registers
    3. password     set when user registers
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

    mapping(address => Users) public Profiles; // holds list of users
    address[] public userProfiles;

    //Seter functions (use methods.send)

    // function to add users
    function registerUser(
        address userAddress,
        string memory _userName,
        string memory _email,
        string memory _password
    ) public returns (address, string memory) {
        Users storage users = Profiles[userAddress];
        users.userName = _userName;
        users.email = _email;
        users.password = _password;
        userProfiles.push(userAddress);
        return (userAddress, users.userName);
    }

    // function to upload files
    function uploadFile(address userAddress, string memory _Hash) public {
        Profiles[userAddress].myFiles.push(_Hash);
    }

    //function to share files
    function shareFile(address userAddress, string memory _Hash) public {
        Profiles[userAddress].sharedFiles.push(_Hash);
    }

    // getter functions (use methods.call)
    // function to get number of users
    function getUsersNumber() public view returns (address[] memory) {
        return userProfiles;
    }

    //function get specific user
    function getUser(address userAddress)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string[] memory,
            string[] memory
        )
    {
        return (
            userAddress,
            Profiles[userAddress].userName,
            Profiles[userAddress].email,
            Profiles[userAddress].myFiles,
            Profiles[userAddress].sharedFiles
        );
    }

    // Signing in function
    function signIn(
        address userAddress,
        string memory _userName,
        string memory _password
    ) public returns (string memory) {
        if (
            keccak256(abi.encodePacked(Profiles[userAddress].userName)) ==
            keccak256(abi.encodePacked(_userName))
        ) {
            if (
                keccak256(abi.encodePacked(Profiles[userAddress].password)) ==
                keccak256(abi.encodePacked(_password))
            ) {
                return "access granted";
            } else {
                return " access denied";
            }
        }
    }

    function getMyFiles(address userAdress)
        public
        view
        returns (string[] memory)
    {
        return Profiles[userAdress].myFiles;
    }

    function getSharedFiles(address userAdress)
        public
        view
        returns (string[] memory)
    {
        return Profiles[userAdress].sharedFiles;
    }
}
