const { expect } = require("chai");
const { ethers } = require("hardhat");

const NAME = "TokenAccess";
const SYMBOL = "TKN";
const OCCASION_NAME = "ETH Texas";
const OCCASION_COST = ethers.parseUnits("1", "ether");
const OCCASION_MAX_TICKETS = 100;
const OCCASION_DATE = "Apr 27";
const OCCASION_TIME = "10:00AM CST";
const OCCASION_LOCATION = "Austin, Texas";

describe("TokenAccess", () => {
  let token;
  let deployer;
  let buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();

    const TokenAcces = await ethers.getContractFactory("TokenAccess");
    token = await TokenAcces.deploy(NAME, SYMBOL);

    const transaction = await token
      .connect(deployer)
      .list(
        OCCASION_NAME,
        OCCASION_COST,
        OCCASION_MAX_TICKETS,
        OCCASION_DATE,
        OCCASION_TIME,
        OCCASION_LOCATION
      );
    await transaction.wait();
  });

  describe("Deployment", async () => {
    it("Should set the right name", async () => {
      let name = await token.name();
      expect(name).to.equal(NAME);
    });

    it("Should set the right symbol", async () => {
      let symbol = await token.symbol();
      expect(symbol).to.equal(SYMBOL);
    });

    it("Should set the right owner", async () => {
      let owner = await token.owner();
      expect(owner).to.equal(deployer.address);
    });
  });

  describe("Occasions", () => {
    it("Returns occasions attributes", async () => {
      const occasion = await token.getOccasion(1);
      expect(occasion.id).to.be.equal(1);
      expect(occasion.name).to.be.equal(OCCASION_NAME);
      expect(occasion.cost).to.be.equal(OCCASION_COST);
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS);
      expect(occasion.date).to.be.equal(OCCASION_DATE);
      expect(occasion.time).to.be.equal(OCCASION_TIME);
      expect(occasion.location).to.be.equal(OCCASION_LOCATION);
    });
    it("Updates occasions count", async () => {
      const totalOccasions = await token.totalOccasions();
      expect(totalOccasions).to.be.equal(1);
    });
  });

  describe("Minting", () => {
    const ID = 1;
    const SEAT = 5;
    const AMOUNT = ethers.parseUnits("1", "ether");

    beforeEach(async () => {
      const transaction = await token
        .connect(buyer)
        .mint(ID, SEAT, { value: AMOUNT });
      await transaction.wait();
    });

    it("Updates ticket count", async () => {
      const occasion = await token.getOccasion(ID);
      expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS - 1);
    });

    it("Updates buying status", async () => {
      const status = await token.hasBought(ID, buyer.address);
      expect(status).to.be.equal(true);
    });

    it("Updates seat status", async () => {
      const owner = await token.seatTaken(ID, SEAT);
      expect(owner).to.equal(buyer.address);
    });

    it("Updates overall seating status", async () => {
      const seats = await token.getSeatsTaken(ID);
      expect(seats.length).to.be.equal(1);
      expect(seats[0]).to.be.equal(SEAT);
    });
    it("Updates Contract balance", async () => {
      const balance = await ethers.provider.getBalance(token.target);
      expect(balance).to.be.equal(AMOUNT);
    });
  });
  describe("Withdraw", () => {
    const ID = 1;
    const SEAT = 50;
    const AMOUNT = ethers.parseUnits("1", "ether");
    let balanceBefore;

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      let transaction = await token
        .connect(buyer)
        .mint(ID, SEAT, { value: AMOUNT });

      await transaction.wait();

      transaction = await token.connect(deployer).withdraw();
      await transaction.wait();
    });

    it("Updates the owner balance", async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.above(balanceBefore);
    });

    it("Updates Contract balance", async () => {
      const balance = await ethers.provider.getBalance(token.target);
      expect(balance).to.be.equal(0);
    });
  });
});
