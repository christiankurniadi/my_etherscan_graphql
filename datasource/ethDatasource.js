const { RESTDataSource } = require("apollo-datasource-rest") // Import RESTDataSource from apollo-datasource-rest

//Vitalik's Ethereum Address
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"

//Etherscan Data Source Class
class EtherDataSource extends RESTDataSource {
  constructor() {
    super()
    // Sets the base URL for Etherscan API requests
    this.baseURL = "https://api.etherscan.io/api"
  }

  // Gets Ether balance for a specific address
  async etherBalanceByAddress() {
    // Call Etherscan balance endpoint, passing address
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    )
  }

  // Gets total Ether supply
  async totalSupplyOfEther() {
    // Call Etherscan ethprice endpoint
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    )
  }

  // Get latest Ether price
  async getLatestEthereumPrice() {
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    )
  }

  // Get estimated block confirmation time
  async getBlockConfirmationTime() {
    // Call Etherscan gasestimate endpoint
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    )
  }
}

module.exports = EtherDataSource
