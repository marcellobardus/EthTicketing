pragma solidity ^0.4.24;

import "./EventToken.sol";

contract TicketSale {
    address owner;
    uint tokenPriceEuroCent;
    uint ethEurCentRate;
    EventToken eventTokenInstance;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this method");
        _;
    }

    modifier ticketsValid() {
        require(eventTokenInstance.isTokenValid(), "To call any method of this contract the event which you're trying to modify must be active");
        _;
    }

    modifier ticketsInvalid() {
        require(!eventTokenInstance.isTokenValid(), "To call any method of this contract the event which you're trying to modify must be active");
        _;
    }

    constructor(address _ticketTokenAddress, uint _tokenPriceEuroCent, uint _ethEurCentRate) public {
        tokenPriceEuroCent = _tokenPriceEuroCent;
        ethEurCentRate = _ethEurCentRate;
        eventTokenInstance = EventToken(_ticketTokenAddress);
        owner = msg.sender;
    }


    function updateEthEuroRate(uint _newRate) public onlyOwner() ticketsValid() {
        ethEurCentRate = _newRate;
    }

    function changePrice(uint _newPrice) public onlyOwner() ticketsValid() {
        tokenPriceEuroCent = _newPrice;
    }

    function withdrawRaisedFunds() public onlyOwner() ticketsInvalid() {
        owner.transfer(this.balance);
    }

    function() public payable ticketsValid() {
        uint _price = (tokenPriceEuroCent / ethEurCentRate) * 1 ether;
        require(msg.value >= _price, "unsufficient funds to buy any ticket");
        uint _quantity = msg.value / _price;
        msg.sender.transfer(msg.value % _quantity);
        eventTokenInstance.transfer(msg.sender, _quantity);
    }
}