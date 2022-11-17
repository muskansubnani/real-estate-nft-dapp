require("@openzeppelin/test-helpers/configure")({
    provider: web3.currentProvider,
    singletons: {
      abstraction: "truffle",
    },
  });

const Escrow = artifacts.require('Escrow.sol');
const RealEstate = artifacts.require('RealEstate.sol');
const { ether} = require('@openzeppelin/test-helpers');

contract('Escrow', accounts => {
    let buyer = accounts[1];
    let seller = accounts[2];
    let inspector = accounts[3];
    let lender = accounts[4];
    let realEstate;
    let escrow;

    beforeEach(async () => {
        // Deploy Real Estate

        realEstate = await RealEstate.new();

        // Mint 
        await realEstate.mint("fakeURI", {from : seller});
        
        // Deploy Escrow
        escrow = await Escrow.new(realEstate.address, seller, inspector, lender);
        
        // Approve Property
        await realEstate.approve(escrow.address, 1, { from : seller});
      
        // List Property
        await escrow.list(1, buyer, ether("10"), ether("5"), {from : seller})
     
    }) 

    describe('Deployment', () => {
        it('Returns NFT address', async () => {
            const result = await escrow.nftAddress()
            expect(result).to.be.equal(realEstate.address)
        })

        it('Returns seller', async () => {
            const result = await escrow.seller()
            expect(result).to.be.equal(seller)
        })

        it('Returns inspector', async () => {
            const result = await escrow.inspector()
            expect(result).to.be.equal(inspector)
        })

        it('Returns lender', async () => {
            const result = await escrow.lender()
            expect(result).to.be.equal(lender)
        })
    })

    describe('Listing', () => {
        it('Updates as listed', async () => {
            const result = await escrow.isListed(1)
            expect(result).to.be.equal(true)
        })

        it('Returns buyer', async () => {
            const result = await escrow.buyer(1)
            expect(result).to.be.equal(buyer)
        })

        it('Returns purchase price', async () => {
            const result = await escrow.purchasePrice(1)
            expect(result.toString()).to.be.equal(ether("10").toString())
        })

        it('Returns escrow amount', async () => {
            const result = await escrow.escrowAmount(1)
            console.log(result)
            expect(result.toString()).to.be.equal(ether("5").toString())
        })

        it('Updates ownership', async () => {
            expect(await realEstate.ownerOf(1)).to.be.equal(escrow.address)
        })
    })

    describe('Deposits', () => {
        beforeEach(async () => {
            transaction = await escrow.depositEarnest(1, { from : buyer, value: ether("5")});            
        })

        it('Updates contract balance', async () => {
            const result = await escrow.getBalance()
            expect(result.toString()).to.be.equal(ether("5").toString())
        })
    })

    describe('Inspection', () => {
        beforeEach(async () => {
            await escrow.updateInspectionStatus(1, true, {from: inspector});   
        })

        it('Updates inspection status', async () => {
            const result = await escrow.inspectionPassed(1)
            expect(result).to.be.equal(true)
        })
    })

    describe('Approval', () => {
        beforeEach(async () => {
            await escrow.approveSale(1, { from : buyer});
   
            await escrow.approveSale(1,  { from : seller});
            
            await escrow.approveSale(1, { from : lender});        
        })

        it('Updates approval status', async () => {
            expect(await escrow.approval(1, buyer)).to.be.equal(true)
            expect(await escrow.approval(1, seller)).to.be.equal(true)
            expect(await escrow.approval(1, lender)).to.be.equal(true)
        })
    })

    describe('Sale', () => {
        beforeEach(async () => {
            await escrow.depositEarnest(1, {from: buyer,  value: ether("5")})
       
            await escrow.updateInspectionStatus(1, true, {from : inspector})
        
            await escrow.approveSale(1, {from : seller});
            
            await escrow.approveSale(1, {from : buyer})
            
            await escrow.approveSale(1, {from : lender})

            await web3.eth.sendTransaction({from: lender, to: escrow.address, value: ether("5")});
            
            await escrow.finalizeSale(1, {from: seller})           
        })

        it('Updates ownership', async () => {
            expect(await realEstate.ownerOf(1)).to.be.equal(buyer)
        })

        it('Updates balance', async () => { 
            expect(await web3.eth.getBalance(escrow.address)).to.be.equal('0')
        })
    })
})