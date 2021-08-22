const hre = require("hardhat");


const main = async ()=>{
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deployer address is ${deployer.address}`);
    const balance = await deployer.getBalance();
    console.log(`Deployer balance is ${balance}`);
    const Token = await hre.ethers.getContractFactory('erc1484');
    const token = await Token.deploy();
    await token.deployed();
    console.log(`Token deployed to address ${token.address}`);
}


main().then(()=>{
    process.exit(0);
}).catch(error =>{
    console.error(error);
    process.exit(1);
});