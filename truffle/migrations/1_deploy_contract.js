// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
require("@openzeppelin/test-helpers/configure")({
  provider: web3.currentProvider,
  singletons: {
    abstraction: "truffle",
  },
});
const { ether }  = require('@openzeppelin/test-helpers');

const Escrow = artifacts.require("Escrow");
const RealEstate = artifacts.require("RealEstate");

module.exports = async function (deployer,network, accounts) {

    let buyer = accounts[1];
    let seller = accounts[2];
    let inspector = accounts[3];
    let lender = accounts[4];
    console.log(seller);

  await deployer.deploy(RealEstate);
  const realEstate = await RealEstate.deployed();

 // console.log(`Deployed Real Estate Contract at: ${realEstate.address}`)
 // console.log(`Minting 3 properties...\n`)

  // for (let i = 0; i < 3; i++) {
  //  await realEstate.mint(`https://ipfs.io/ipfs/QmQVcpsjrA6cr1iJjZAodYwmPekYgbnXGo4DFubJiLc2EB/${i + 1}.json`,{from : seller});
  // }

  // Deploy Escrow
  await deployer.deploy(Escrow, realEstate.address, seller, inspector, lender);

  const escrow = await Escrow.deployed();

 //console.log(`Deployed Escrow Contract at: ${escrow.address}`)
  //console.log(`Listing 3 properties...\n`)

//  for (let i = 0; i < 3; i++) {
//      // Approve properties...
//      await realEstate.approve(escrow.address, i + 1, {from:seller}); 
//   }

//    // Listing properties...
//   await escrow.list(1, buyer, ether("4"), ether("1"), {from:seller});

//   await escrow.list(2, buyer, ether("8"), ether("2"), {from:seller});

//   await escrow.list(3, buyer, ether("5"), ether("2"), {from:seller});

 // console.log(`Finished.`)

};

