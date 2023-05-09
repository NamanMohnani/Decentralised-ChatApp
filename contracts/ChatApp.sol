//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0 ;

contract ChatApp{

    struct user{
        string name;
        friend[] friends_list;
    }

    struct friend{
        address public_key;
        string name;
    }

    struct message{
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct AllUserStruck{

        string name;
        address account_key;
    }

    AllUserStruck[] getAllUsers;

    mapping (address=>user) user_list;
    mapping(bytes32=>message[]) all_messages;

    function checkUserExists(address public_key) public view returns (bool){
        return bytes(user_list[public_key].name).length>0;
    }

    function createAccount(string calldata name) external{
        require(checkUserExists(msg.sender)==false, "user already exists !!");
        require(bytes(name).length>0,"user name cannot be empty !!");
        user_list[msg.sender].name=name;
        getAllUsers.push(AllUserStruck(name,msg.sender));
    }

    function getUsername(address public_key) external view returns(string memory ){
        require(checkUserExists(public_key),"user does not exit !");
        return user_list[public_key].name;
    }

    function addFriend(address friend_key, string calldata name) external{
        require(checkUserExists(friend_key),"friend does not exit");
        require(checkUserExists(msg.sender),"create account first !!");
        require(msg.sender!=friend_key," both are same person !");
        require(checkAlreadyFriends(msg.sender, friend_key)==false, "already friends");
        
        _add_friend(msg.sender, friend_key, name);
        _add_friend(friend_key, msg.sender, user_list[msg.sender].name);
    }

    function checkAlreadyFriends(address x, address y) internal view returns(bool){
        if(user_list[x].friends_list.length > user_list[y].friends_list.length){
            address temp = x;
            x=y;
            y=temp;
        }
         for(uint256 i = 0 ; i<user_list[x].friends_list.length; i++){
            if(user_list[x].friends_list[i].public_key==y){
                return true;
            }
    
        }
        return false;
    }

    function _add_friend(address me, address friend_key, string memory name) internal{
        friend memory new_friend = friend(friend_key,name);
        user_list[me].friends_list.push(new_friend);
    }

    function getMyFriendList() external view returns(friend[] memory){
        return user_list[msg.sender].friends_list;
    }

    function _getChatCode(address key1, address key2) internal pure returns(bytes32){
        if(key1<key2){
            return keccak256(abi.encodePacked(key1,key2));
        }
        else {
            return keccak256(abi.encodePacked(key2,key1));
        }
    }

    function sendMessage(address friend_key, string calldata _msg) external{
        require(checkAlreadyFriends(msg.sender, friend_key),"you are not friend with given address");
        require(checkUserExists(friend_key),"friend does not exist");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        message memory new_message = message(msg.sender, block.timestamp, _msg);
        all_messages[chatCode].push(new_message);
    }

    function readMessage(address friend_key) external view returns (message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return all_messages[chatCode];
    }

    function getAllApplicationUsers() public view returns (AllUserStruck[] memory){
        return getAllUsers;
    }
}