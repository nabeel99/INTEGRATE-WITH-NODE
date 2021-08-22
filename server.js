const { ethers } = require('ethers');
const express = require('express');
const hre = require("hardhat");
const app = express();
const Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
let accounts;



let deployer,addr1,addr2;
const abi = require('./artifacts/contracts/Erc1484.sol/erc1484.json');
let cInstance = new web3.eth.Contract(abi.abi,'0x5fbdb2315678afecb367f032d93f642f64180aa3');


app.use(express.json());



app.get('/identityexists/:id',async (req,res) =>{
    let result = await cInstance.methods.identityExists(parseInt(req.params.id)).call().then(resu => {
        console.log(`sent server paramater ${req.params.id} got output ${resu}`);
        res.send(resu);});
   
})

app.post('/createidentity',async (req,res) =>{
    
    let result = await cInstance.methods.createIdentity(req.body.address,[addr1.address,addr2.address],
        [addr1.address,addr2.address]).send(
        {from:accounts[0]})
        .then(async (resu) => {
          
            console.log(resu);
            let returnval = resu.events.IdentityCreated.returnValues;
        console.log(`sent server create identity request ,got output ${returnval.initiator} as the intitiator `);
        res.send(resu);});
   
})

const port = 9999
app.listen(port,async ()=>{
    accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    console.log(`Server Started Listening on port ${port}`);
   [deployer,addr1,addr2] = await hre.ethers.getSigners();
})