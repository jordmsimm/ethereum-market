//import "./Ownable.sol";
import "./zeppelin/ownership/Ownable.sol";

pragma solidity ^0.4.23;
contract Administrator is Ownable{
   
    //address owner;
    mapping (address => bool) public admins;
    
    constructor() public {
      //set the owner of contract and make them an administrator
      owner = msg.sender;
      admins[msg.sender] = true;
    }
    //modifier onlyOwner(){require(msg.sender == owner); _;}
    function isUserAdmin(address _sender) public view returns(bool){
        //checks to see if an address is an administrator, used as modifiers in other contracts
        return admins[_sender];
    }
    
 
    function addAdmin(address _addr) public onlyOwner {
        admins[_addr] = true;
     }
     
     function blockAdmin(address _adminAddress) public onlyOwner{
         //block address of administrator to false
        admins[_adminAddress] = false;
     }
       
    
}