pragma solidity ^0.4.23;
import "./Administrator.sol";
//import "browser/Ownable.sol";
//import "zeppelin-solidity/contracts/ownership/Ownable.sol";
contract Stores is Ownable{
    address public adminAddress;
    Administrator administratorContract;

    address[] public storeOwnerAddresses;
    uint storeOwnerCount;
    mapping (address =>Storeowner) storeOwner;
    mapping(uint => Storefront) stores;
    uint64 storeCount;

    struct Storeowner {
        string name;
        bool isActive;
        address activatedBy;
        
    }
    
    struct Storefront {
        uint storeId;
        string name;
        uint64 productCount;
        address owner;
        mapping(uint => Product) products;
    }
    
    struct Product {
        uint256 productId;
        string name;
        uint price;
        uint quantity;
    }
    
    modifier onlyAdmin {require(administratorContract.isUserAdmin(msg.sender)); _;}
    modifier isStoreOwnerActive() {require(storeOwner[msg.sender].isActive == true); _;}
    
    constructor() public {
      owner = msg.sender;
      storeCount = 0;
      storeOwnerCount = 0;
    }
    
    function setAdministratorContractAddress(address _adminAddress) public onlyOwner {
        adminAddress = _adminAddress;
        administratorContract = Administrator(_adminAddress);
    }
    
    function applyForStoreOwner( string storeName) public {
        storeOwner[msg.sender].name = storeName ;
        storeOwner[msg.sender].isActive = false;
        uint _storeOwnerCount = storeOwnerAddresses.push(msg.sender);
        storeOwnerCount = _storeOwnerCount;
        //storeOwner[msg.sender].storeCount = 0;
     }
     function getStoreOwnerAddress(uint _storeOwnerCount) public view returns (address _storeOwnerAddress){
         return storeOwnerAddresses[_storeOwnerCount];
     }
     
     function activateStoreOwner(address _addr) public onlyAdmin {
        storeOwner[_addr].isActive = true;
        storeOwner[_addr].activatedBy = msg.sender;
     }
     
     function blockStoreOwner(address _addr) public onlyAdmin {
        storeOwner[_addr].isActive = false;
     }
     
     function getStoreOwnerInformation(address _addr) public view returns(string name,bool isActive) {
        return (storeOwner[_addr].name,storeOwner[_addr].isActive);
     }
     
     function addStoreFront(string _name) public isStoreOwnerActive {
         uint64 _storeCount = storeCount + 1;
         storeCount = _storeCount;
         stores[_storeCount].name = _name;
         stores[_storeCount].owner = msg.sender;
         stores[_storeCount].productCount = 0;
     }
     
     function getStoreFront( uint _id) public view returns(string name, uint productCount, address owner){
         
         return (stores[_id].name,
                 stores[_id].productCount,
                 stores[_id].owner);
         
     }
     
     function addProduct(uint _storeId, string _name, uint _price , uint _quantity) public isStoreOwnerActive {
        uint64 _productCount = stores[_storeId].productCount + 1;
        stores[_storeId].productCount = _productCount;
        stores[_storeId].products[_productCount].name = _name;
        stores[_storeId].products[_productCount].price = _price;
        stores[_storeId].products[_productCount].quantity = _quantity;
     }
    
     function getStoreProduct(uint _storeFrontId, uint _productId) public view returns(string name, uint price, uint quantity) {
        return  (
            stores[_storeFrontId].products[_productId].name,
            stores[_storeFrontId].products[_productId].price,
            stores[_storeFrontId].products[_productId].quantity
        );
    }
    function getTotalStores() public view returns (uint storeCount){
        return storeCount;
    }
    
    function buyProduct(address storeOwnerAddress,uint _storeFrontId, uint _productId) public payable{
        
    }
}