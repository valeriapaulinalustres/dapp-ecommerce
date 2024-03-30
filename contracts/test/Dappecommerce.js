const { expect } = require("chai");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), "ether"); //ethers.utils.parseUnits deprecated
};

//Global constanst for Item
const ID = 1;
const NAME = "Shoes";
const CATEGORY  = "Clothing";
const IMAGE = "https://cdn.pixabay.com/photo/2013/07/12/18/20/shoes-153310_640.png";//se hace con ipfs, ver tutorial
const COST = tokens(1); //eth-converter-com, no se usan decimales
const RATING = 4;
const STOCK = 5;

describe("Dappecommerce", () => {
  let dappecommerce;
  let deployer;
  let buyer;



  beforeEach(async () => {

    //Setup accounts
    //console.log( await ethers.getSigners())
    [deployer, buyer] = await ethers.getSigners()
    

    //Deploy contract
    const Dappecommerce = await ethers.getContractFactory("Dappecommerce");
    dappecommerce = await Dappecommerce.deploy();
  });

  describe("Deployment", () => {

    it("Sets the owner", async () => {
        expect(await dappecommerce.owner()).to.equal(deployer.address);
        //npx hardhat test
      });

    it("Has a name", async () => {
      expect(await dappecommerce.name()).to.equal("Dappecommerce");
      //npx hardhat test
    });
  });

  describe("Listing", () => {
    let transaction;



    beforeEach(async () => {
      //List an item
        transaction =   await dappecommerce.connect(deployer).list(
            ID,
            NAME,
            CATEGORY,
            IMAGE,
            COST,
            RATING,
            STOCK
            )
            await transaction.wait()

            //Buy an item
            transaction = await dappecommerce.connect(buyer).buy(ID, {value: COST})
          })
          
          it("Updates the contract balance", async ()=>{
            const address = await dappecommerce.getAddress();//actualización de solidity para el vendedor, no para el comprador
            //console.log('address', address)
          const result = await ethers.provider.getBalance(address)
          //console.log('cost', result)
          expect(result).to.equal(COST)
        })

        it("Updates buyer´s order account", async ()=>{
          const result = await dappecommerce.orderCount(buyer.address)
          console.log('result', result)
          expect(result).to.equal(1)
        })

        it("Adds the order", async ()=>{
          const order = await dappecommerce.orders(buyer.address,1)
          console.log('order', order)
          //expect(order.time).to.be.greaterThan(0)
          expect(order.item.name).to.equal(NAME)
        })

        it("Emits buy event", ()=>{
          expect(transaction).to.emit(dappecommerce, "Buy")
        })
        
        it("Returns item attributes", async () => {
            const item = await dappecommerce.items(1) 
            expect(item.id).to.equal(ID)
            expect(item.name).to.equal(NAME)
            expect(item.category).to.equal(CATEGORY)
            expect(item.image).to.equal(IMAGE)
            expect(item.cost).to.equal(COST)
            expect(item.rating).to.equal(RATING)
            expect(item.stock).to.be.lessThan(STOCK)
           // console.log(item)
      });

        it("Emit list event", ()=>{
          expect(transaction).to.emit(dappecommerce, "List")
        })
  });
});
