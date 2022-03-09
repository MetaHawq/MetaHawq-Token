const hre = require("hardhat");

async function main() {
 
  const MetaHawqToken_ = await hre.ethers.getContractFactory("MetaHawqToken");
  const metahawqtoken_ = await MetaHawqToken_.deploy();

  await metahawqtoken_.deployed();

  console.log("contract deployed to:", metahawqtoken_.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });