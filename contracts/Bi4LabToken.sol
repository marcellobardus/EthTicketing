pragma solidity ^0.4.24;
  
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";  
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

  
/**  
* @title Bi4LabToken is a basic ERC20 Token  
*/  
contract Bi4LabToken is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable {

    constructor(
        uint256 _initialSupply,
        string memory _name,
        string memory _symbol,
        uint8 _decimals
        )  
            ERC20Detailed(_name, _symbol, _decimals)
            ERC20Mintable()
            ERC20Burnable()
            ERC20()
            public
    {
        mint(msg.sender, _initialSupply);
    }

}