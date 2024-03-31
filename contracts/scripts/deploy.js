// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { items } = require("../../src/items.json")

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether') //ethers.utils.parseUnits deprecado
}

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners()

  // Deploy Dappazon
  const Dappecommerce = await hre.ethers.getContractFactory("Dappecommerce")
  //console.log('Dappecommerce', Dappecommerce)
  const dappecommerce = await Dappecommerce.deploy()
  console.log('dap', dappecommerce)
  await dappecommerce.waitForDeployment()//.deployed está deprecado

  console.log(`Deployed Dappecommerce Contract at: ${ await dappecommerce.getAddress()}\n`)

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await dappecommerce.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});