# Real Estate NFT Dapp

## About The Project
This platform allows you to list NFTs that you would like to sell to given buyer. The platform inspects the NFT as well as the buyer's deposit and validates the transaction (for a fee) before approving and finalising the sale ( escrow contract).  Please visit the following website for more information on escrow contract ( https://www.geeksforgeeks.org/what-is-escrow-smart-contract/)


## Technology Stack & Tools
  - Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- Truffle (Development Framework)
- Ethers.js (Blockchain Interaction)
- React.js (Frontend Framework)

## Prerequisites 
To engage with the Dapp you will need the following :

* NodeJS ([https://nodejs.org/en/](https://nodejs.org/en/))
	> npm install nodejs
* Ganache([https://www.trufflesuite.com/ganache](https://www.trufflesuite.com/ganache))
	>npm install ganache-cli -g
* Truffle([https://www.trufflesuite.com/truffle] (https://www.trufflesuite.com/truffle))
	> npm install truffle
* Metamask (Chrome Extension) 🦊
  
## Setting Up

* Clone/Download the repository
* Install dependencies in truffle and client folder
	>npm install
* Truffle([https://www.trufflesuite.com/truffle] (https://www.trufflesuite.com/truffle))
	> npm install truffle
* Run tests
  > $ truffle test
* Start local Ganache Node
	> In a separate terminal execute run the following command : Ganache
* Deploy script locally
	>  Inside truffle folder run the following command
   > * $ truffle console --network development
   > * $ truffle compile
   > * $ truffle migrate
* Run react project
	>  In client folder run the following command
  > $ npm start
      
