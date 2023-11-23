// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (amount) => ethers.parseUnits(amount.toString(), "ether");

async function main() {
  const [deployer] = await ethers.getSigners();
  const NAME = "TokenAccess";
  const SYMBOL = "TKA";

  // Deploy contract
  const TokenAccess = await ethers.getContractFactory("TokenAccess");
  const token = await TokenAccess.deploy(NAME, SYMBOL);
  await token.waitForDeployment();
  console.log(`TokenAccess deployed to:", ${token.target}`);

  // Mint tokens
  const occassions = [
    {
      name: "River Plate vs Boca Juniors",
      cost: tokens(3),
      tickets: 125,
      date: "December 12, 2023",
      time: "6:00 PM (UTC-3)",
      location: "Santiago Bernabeu, Madrid",
    },
    {
      name: "ETH Buenos Aires",
      cost: tokens(2),
      tickets: 100,
      date: "December 1, 2023",
      time: "2:00 PM (UTC-3)",
      location: "Luna Park, Buenos Aires",
    },
    {
      name: "Lollapaooza Argentina",
      cost: tokens(3),
      tickets: 125,
      date: "16, 17, 18 March 2024",
      time: "12:00 PM (UTC-3)",
      location: "Hipódromo de San Isidro, Buenos Aires",
    },
    {
      name: "Primavera Sound",
      cost: tokens(1),
      tickets: 0,
      date: "25, 26 November 2023",
      time: "1:00 PM (UTC-3)",
      location: "Parque Sarmiento, Buenos Aires",
    },
    {
      name: "Rawayana",
      cost: tokens(1),
      tickets: 50,
      date: "10 December 2023",
      time: "9:00 PM (UTC-3)",
      location: "C Complejo Art Media, Buenos Aires",
    },
    {
      name: "H4ck3d Security Conference 2023",
      cost: tokens(3),
      tickets: 40,
      date: "30 November 2023",
      time: "10:00 AM (UTC-3)",
      location: "Universidad de Palermo (Mario Bravo 1050), Buenos Aires",
    },
    {
      name: "Venezuela vs Argentina",
      cost: tokens(2),
      tickets: 100,
      date: "10 October 2024",
      time: "8:30 PM (UTC-3)",
      location: "Estadio Monumental Antonio Vespucio Liberti, Buenos Aires",
    },
  ];

  for (let i = 0; i < occassions.length; i++) {
    const transaction = await token
      .connect(deployer)
      .list(
        occassions[i].name,
        occassions[i].cost,
        occassions[i].tickets,
        occassions[i].date,
        occassions[i].time,
        occassions[i].location
      );
    await transaction.wait();
    console.log(`Listed Event ${i + 1}}: ${occassions[i].name}`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//npx hardhat run scripts/deploy.js --network localhost
