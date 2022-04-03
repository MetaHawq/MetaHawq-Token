const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Test token variables", async function () {
	let Token, token;
	beforeEach(async function () {
		Token = await ethers.getContractFactory("MetaHawqToken");
		[owner, add1, add2, ...addrs] = await ethers.getSigners();
		token = await Token.deploy();
		await token.deployed();
	});
	describe("Deployment", () => {
		it("Should return the correct name and symbol", async () => {
			expect(await token.name()).to.equal("MetaHawq");
			expect(await token.symbol()).to.equal("MTH");
		});

		it("Should return correct decimal places", async () => {
			expect(await token.decimals()).to.equal(18);
		});

		it("Should return the correct balance the deployer address", async () => {
			expect(await token.balanceOf(owner.address)).to.equal(
				"1000000000000000000000000"
			);
		});

		it("test for total supply", async () => {
			expect(await token.totalSupply()).to.equal("1000000000000000000000000");
		});
	});

	describe("Functions check", () => {
		it("test for allowance function", async () => {
			expect(await token.allowance(owner.address, add1.address)).to.equal("0");
			await token.approve(add1.address, "1000000000000000000000000"); // 24 0's
			expect(await token.allowance(owner.address, add1.address)).to.equal(
				"1000000000000000000000000"
			);
		});
	});

	describe("approve Function", () => {
		it("test for approve function", async () => {
			await token.approve(add1.address, "1000000000000000000000000");
			expect(await token.allowance(owner.address, add1.address)).to.equal(
				"1000000000000000000000000"
			);
		});
		it("through error for 0 address spender", async () => {
			await expect(token.approve(0, "1000000000000000000000000")).to.be
				.reverted;
		});
	});

	describe("transfer Function", () => {
		it("test for transfer function", async () => {
			await token.transfer(add2.address, "1000000000000000000000000");
			expect(await token.balanceOf(add2.address)).to.equal(
				"1000000000000000000000000"
			);
		});

		it("through error for 0 address transfer", async () => {
			await expect(token.transfer(0, "1000000000000000000000000")).to.be
				.reverted;
		});
	});

	describe("transferFrom function", () => {
		it("Check for transferFrom function", async () => {
			await token.approve(add1.address, "1000000000000000000000000");
			await token
				.connect(add1)
				.transferFrom(owner.address, add2.address, "1000000000000000000000000");
			expect(await token.balanceOf(add2.address)).to.equal(
				"1000000000000000000000000"
			);
		});

		it("error for more amount used than allowed amount", async () => {
			await token.approve(add1.address, "1000000000000000000000000");
			await expect(
				token
					.connect(add1)
					.transferFrom(
						owner.address,
						add2.address,
						"2000000000000000000000000"
					)
			).to.be.reverted;
		});
	});

	describe("Increase Allowance", () => {
		it("Check for increase allowance", async () => {
			await token.approve(add1.address, "1000000000000000000000000");
			await token.increaseAllowance(add1.address, "1000000000000000000000000");
			expect(await token.allowance(owner.address, add1.address)).to.equal(
				"2000000000000000000000000"
			);
		});
	});

	describe("Decrease Allowance", () => {
		it("Check for decrease allowance", async () => {
			await token.approve(add1.address, "1000000000000000000000000");
			await token.decreaseAllowance(add1.address, "1000000000000000000000000");
			expect(await token.allowance(owner.address, add1.address)).to.equal("0");
		});
		it("Show error when decrement is larger than allowance amount.", async () => {
			await token.approve(add1.address, "1000000000000000000000000");
			await expect(
				token.decreaseAllowance(add1.address, "2000000000000000000000000")
			).to.be.reverted;
		});
	});
});
