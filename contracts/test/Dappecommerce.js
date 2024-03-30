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
        transaction =   await dappecommerce.connect(deployer).list(
            1,
            NAME,
            CATEGORY,
            IMAGE,
            COST,
            RATING,
            STOCK
            )
            await transaction.wait()
        })
        
        it("Returns item attributes", async () => {
            const item = await dappecommerce.items(1) 
            expect(item.id).to.equal(1)
            //console.log(item)
      });
  });
});
