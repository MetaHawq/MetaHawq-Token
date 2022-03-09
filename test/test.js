const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Test token variables', async function () {
  let Token, token;
  before(async function () {
    Token = await ethers.getContractFactory('MetaHawqToken');
    token = await Token.deploy();
    await token.deployed();
  });

   it('Should return the correct name and symbol', async function () {
     expect(await token.name()).to.equal('MetaHawq');
     expect(await token.symbol()).to.equal('MTH');
   });

  it('Should return the correct balance the deployer address', async function () {
    const signers = await ethers.getSigners();
   
    const deployerAdd = signers[0].address;
    expect(await token.balanceOf(deployerAdd)).to.equal('1000000000000000000000000');
  });
  
  it('test for total supply', async function () {
    
    expect(await token.totalSupply()).to.equal('1000000000000000000000000');
  });

  it('test for approve function', async function () {
    const signers = await ethers.getSigners();
    const deployerAdd = signers[0]
    const deployerAdd_ = signers[0].address;
    const address2 = signers[1].address;
    const tx1 = await token.connect(deployerAdd).approve(address2, '1000000000000000000000000')
    expect(await token.allowance(deployerAdd_, address2)).to.equal('1000000000000000000000000');
  });

  it('test for transfer function', async function () {
    const signers = await ethers.getSigners();
    const deployerAdd = signers[0]
    const deployerAdd_ = signers[0].address;
    const address2 = signers[1].address;
    const tx1 = await token.connect(deployerAdd).transfer(address2,'1000000000000000000000000')
    expect(await token.balanceOf(address2)).to.equal('1000000000000000000000000');

  });
});