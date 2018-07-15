var Stores = artifacts.require("./Stores.sol");
var Administrator = artifacts.require("./Administrator.sol");

contract('Stores', function(accounts) {

  it(". . . it should apply for a store", function() {
    return Stores.deployed().then(function(instance) {
      storesInstance = instance;

      return storesInstance.applyForStoreOwner("Test Store", {from: accounts[1]});
    }).then(function() {
      return storesInstance.getStoreOwnerInformation.call(accounts[1]);
    }).then(function(result) {
      assert.equal(result[0], "Test Store", "The store owner did not apply for a store");
    });
  });


    it(". . . it should activate store that has applied", function() {
        return Stores.deployed().then(function(instance2) {
            return Administrator.deployed().then(function(instance1) {
            adminInstance = instance1
            storesInstance = instance2;
            
            storesInstance.setAdministratorContractAddress(adminInstance.address)
            return storesInstance.applyForStoreOwner("Test Store", {from: accounts[1]});
            }).then(function() {
            return storesInstance.activateStoreOwner(accounts[1], {from:accounts[0]});
            }).then(function() {
            return storesInstance.getStoreOwnerInformation.call(accounts[1]);
            }).then(function(result) {
            assert.equal(result[1], true, "The store was not activated");
            });
        });
    });


    it(". . . it should block a store that has been activated", function() {
        return Stores.deployed().then(function(instance2) {
            return Administrator.deployed().then(function(instance1) {
            adminInstance = instance1
            storesInstance = instance2;
            
            storesInstance.setAdministratorContractAddress(adminInstance.address)
            return storesInstance.applyForStoreOwner("Test Store", {from: accounts[1]});
            }).then(function() {
            return storesInstance.activateStoreOwner(accounts[1], {from:accounts[0]});
            }).then(function() {
            return storesInstance.blockStoreOwner(accounts[1], {from:accounts[0]});
            }).then(function() {
            return storesInstance.getStoreOwnerInformation.call(accounts[1]);
            }).then(function(result) {
            assert.equal(result[1], false, "The store was not blocked");
            });
        });
    });

    it(". . . it should create a storefront", function() {
        return Stores.deployed().then(function(instance2) {
            return Administrator.deployed().then(function(instance1) {
            adminInstance = instance1
            storesInstance = instance2;
            
            storesInstance.setAdministratorContractAddress(adminInstance.address)
                return storesInstance.applyForStoreOwner("Test Store", {from: accounts[1]});
            }).then(function() {
                return storesInstance.activateStoreOwner(accounts[1], {from:accounts[0]});
            }).then(function() {
                return storesInstance.addStoreFront("Store 1", {from:accounts[1]});
            }).then(function() {
                return storesInstance.getStoreFront.call(1);
            }).then(function(result) {
            assert.equal(result[0], "Store 1", "The storefront was not created");
            });
        });
    });

    it(". . . it should add a product to the store front", function() {
        return Stores.deployed().then(function(instance2) {
            return Administrator.deployed().then(function(instance1) {
            adminInstance = instance1
            storesInstance = instance2;
            
            storesInstance.setAdministratorContractAddress(adminInstance.address)
                return storesInstance.applyForStoreOwner("Test Store", {from: accounts[1]});
            }).then(function() {
                return storesInstance.activateStoreOwner(accounts[1], {from:accounts[0]});
            }).then(function() {
                return storesInstance.addStoreFront("Store 1", {from:accounts[1]});
            }).then(function() {
                return storesInstance.addProduct(1,"My first product",20,100, {from:accounts[1]});
            }).then(function() {
                return storesInstance.getStoreProduct.call(1,1);
            }).then(function(result) {
            assert.equal(result[0], "My first product", "The product was not added");
            });
        });
    });
    
    
});
