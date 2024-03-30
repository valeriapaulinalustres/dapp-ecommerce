// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;


 import "hardhat/console.sol";

 contract Dappecommerce {

string public name;
address public owner;

struct Item {
      uint256 id; //uint for integers without sign
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
}

struct Order {
    uint256 time;
    Item item;
}

mapping(uint256 => Item) public items; //mapping(key => value) 
mapping(address => mapping(uint256 => Order)) public orders;
mapping(address => uint256) public orderCount;

event Buy(address buyer, uint256 orderId, uint256 itemId);
event List(string name, uint256 cost, uint256 stock);

modifier onlyOwner(){ //es un middleware
require(msg.sender == owner); //sólo si es true continuará con la función, sólo el vendedor puede agregar productos al stock para vender
_; //esto representa el body de la función
}

constructor () {
    name = "Dappecommerce";
    owner = msg.sender; //who makes the deploy of the contract to the blockchain
}
    //List Products

    function list(
        uint256 _id, 
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {

        
//Create Item struct
Item memory item = Item(
    _id, 
    _name, 
    _category, 
    _image, 
    _cost, 
    _rating, 
    _stock
    );

//Save Item strcut to blockchain
items[_id] = item; //here we use the mapping
    

    //Emit an event
emit List(_name, _cost, _stock);
    }
    
    //Buy products

function buy(uint256 _id) public payable { //payable es un modifier (middleware) nativo que permite enviar ethers adentro del contrato (el comprador compra y manda ethers dentro del contrato, luego el vendedor los retira del contrato)
//Fetch item
Item memory item = items[_id]; //se trae de la blockchain a ese item id

//Require enough ether to  buy the product
require(msg.value >= item.cost);

//Require item is in stock
require(item.stock > 0);

//Create order
Order memory order = Order(block.timestamp, item); //epochconverter.com en solidity se usa el timestamp en epoch

//Add order for user
orderCount[msg.sender] = orderCount[msg.sender] + 1; //es lo mismo que  poner orderCount[msg.sender]++
orders[msg.sender][orderCount[msg.sender]] = order;


//Substract stock
items[_id].stock = item.stock -1;
//Emit event
emit Buy(msg.sender, orderCount[msg.sender], item.id);
}

    //Withdraw funds
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value:address(this).balance}("");
        require(success);
    }


 }
//https://www.youtube.com/watch?v=X1ahXNYkpL8&ab_channel=DappUniversity
 //continuar desde minuto 1:16:40 escribir el testing de emit