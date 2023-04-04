const ethers = require("ethers");
const { Interface } = require("ethers/lib/utils");
// const fetch = require("node-fetch");
const fetch = require('node-fetch');

async function main() {

const iface = new Interface([
    "function read() external view returns (int224 value, uint32 timestamp)",
    "function api3ServerV1() external view returns (address)",
    "function dapiNameHash() external view returns (bytes32)"
    ]);

// API CALL
const dapiName = ["AAVE", "ADA", "ALGO", "ANKR", "APE", "API3", "ARB", "ATOM", "AUD", "AVAX", "AXS", "BAL", "BAT", "BIT", "BNB", "BRL", "BTC", "BTT", "BUSD", "CAD", "CAKE", "CELO", "CHF", "CHZ", "CNY", "COMP", "CRO", "CRV", "CVX", "DAI", "DOGE", "DOT", "DYDX", "ETH", "EUL", "EUR", "FIL", "FLOW", "FRAX", "FTM", "FXS", "GBP", "GLMR", "GMX", "GNO", "GRT", "HBAR", "HNT", "HT", "ICP", "IMX", "INR", "JOE", "JPY", "KDA", "KRW", "KSM", "LDO", "LINK", "LQTY", "LTC", "LUSD", "MANA", "MATIC", "METIS", "MIMATIC", "MKR", "MOVR", "MXN", "NEAR", "NZD", "OKB", "OP", "PAXG", "PHP", "QUICK", "ROSE", "RPL", "RSR", "RUNE", "SAND", "SEK", "SGD", "SHIB", "SNX", "SOL", "STETH", "STG", "STMATIC", "STX", "SUSD", "SUSHI", "TRY", "TUSD", "UNI", "USDC", "USDP", "USDT", "WBTC", "XLM", "XMR", "XRP", "XTZ", "YFI", "ZAR", "ZIL", "ZRX"]
console.log(dapiName.length)
const chain = "arbitrum";
const name = "ADA";
const response = await fetch("https://db-api-prod.api3.org/api/dapi-status?" + "chain=" + chain + "&name=" + name + "%2FUSD");
const body = await response.json();
console.log(body);

const proxyAddresses = ["0x8DF7d919Fe9e866259BB4D135922c5Bd96AF6A27", "0x28Cac6604A8f2471E19c8863E8AfB163aB60186a", "0xF63Fa6EA00678F435Ae3e845541EBb2Db0a1e8fF", "0xf5378f59e733918E00Bea9ED00A88C50a873b5ce", "0x2953C34bb5f6C374C59Be87743A1B0e34D6b7f7d", "0x6538D9c4b12b5E5E209917D29C097465Ba8EFA02", "0xe5Cf15fED24942E656dBF75165aF1851C89F21B5"]
const proxyAddress = "0x8DF7d919Fe9e866259BB4D135922c5Bd96AF6A27";
const provider = new ethers.providers.JsonRpcProvider("https://zkevm-rpc.com");
for (let i = 0; i < proxyAddresses.length; i++) {
    const proxy = new ethers.Contract(proxyAddresses[i], iface, provider);
    const api3ServerV1 = await proxy.api3ServerV1();
    const dapiNameHash = await proxy.dapiNameHash();
    console.log(api3ServerV1,dapiNameHash);
}
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
