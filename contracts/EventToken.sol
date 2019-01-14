pragma solidity ^0.4.2;
  
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";  
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

  
/**  
* @title EventToken is a basic ERC20 Token  
*/  
contract EventToken is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable {

    uint256 ticketExpiryDateTimestamp;

    uint256 ticketPrice;
    uint256 maxTicketsSupply;
    uint256 emitedTickets;

    address owner;

    constructor(
        uint256 _maxSupply,
        string memory _name,
        string memory _symbol,
        uint256 _expireAfter,
        uint256 _ticketPrice
        )  
            ERC20Detailed(_name, _symbol, 0)
            ERC20Mintable()
            ERC20Burnable()
            ERC20()
            public
    {
        maxTicketsSupply = _maxSupply;
        ticketPrice = _ticketPrice;
        ticketExpiryDateTimestamp = now + _expireAfter;
        owner = msg.sender;
    }

    function() public payable {
        require(now < ticketExpiryDateTimestamp, "This sale has been completed");
        require(emitedTickets < maxTicketsSupply, "Sold out");
        uint _ticketsAmount = msg.value / ticketPrice;
        require(_ticketsAmount < maxTicketsSupply, "You can't buy more tickets than the emitted number");
        require(_ticketsAmount > 0, "You did not pay enough to buy any ticket");
        msg.sender.transfer(msg.value - _ticketsAmount * ticketPrice);
        mint(msg.sender, _ticketsAmount);
        emitedTickets += _ticketsAmount;
    }
    
    function getTickePrice() public view returns(uint) {
        return ticketPrice;
    }

    function withdraw() public {
        require(msg.sender == owner);
        msg.sender.send(this.balance);
    }
    
    function updatePrice(uint _newPrice) public {
        require(msg.sender == owner, "Only contract owner can update tickets price");
        ticketPrice = _newPrice;
    }


    function totalSupply() public view returns(uint256) {
        if(now > ticketExpiryDateTimestamp) {
            return 0;
        } else {
            return ERC20.totalSupply();
        }
    }

    function balanceOf(address owner) public view returns (uint256) {
        if(now > ticketExpiryDateTimestamp) {
            return 0;
        } else {
            return ERC20.balanceOf(owner);
        }
    }

    function allowance(address owner, address spender) public view returns(uint256) {
        if(now > ticketExpiryDateTimestamp) {
            return 0;
        } else {
            return ERC20.allowance(owner, spender);
        }
    }

    function transfer(address to, uint256 value) public returns(bool) {
        if(now > ticketExpiryDateTimestamp) {
            return false;
        } else {
            return ERC20.transfer(to, value);
        }
    }

    function approve(address spender, uint256 value) public returns (bool) {
        if(now > ticketExpiryDateTimestamp) {
            return false;
        } else {
            return ERC20.approve(spender, value);
        }
    }

    function transferFrom(address from, address to, uint256 value) public returns(bool) {
        if(now > ticketExpiryDateTimestamp) {
            return false;
        } else {
            return ERC20.transferFrom(from, to, value);
        }
    }

    function isTokenValid() public view returns(bool) {
        if(now >= ticketExpiryDateTimestamp) {
            return false;
        }
        return true;
    }
}