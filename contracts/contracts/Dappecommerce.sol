// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;


 import "hardhat/console.sol";

 contract Dappecommerce {

string public name;
address public owner;

struct Item {
      uint256 id; //uint for integers without sign
        string name;
        string description;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
}

mapping(uint256 => Item) public items; //mapping(key => value) 

constructor () {
    name = "Dappecommerce";
    owner = msg.sender; //who makes the deploy of the contract to the blockchain
}
    //List Products

    function list(
        uint256 _id, 
        string memory _name,
        string memory _description,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public {

//Create Item struct
Item memory item = Item(
    _id, 
    _name, 
    _description, 
    _image, 
    _cost, 
    _rating, 
    _stock
    );

//Save Item strcut to blockchain
items[_id] = item; //here we use the mapping
    }

    //Buy products

    //Withdraw funds



 }
//https://www.youtube.com/watch?v=X1ahXNYkpL8&ab_channel=DappUniversity
 //continuar desde minuto 55