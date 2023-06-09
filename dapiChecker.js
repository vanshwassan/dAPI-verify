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
// ["AAVE", "ADA", "ALGO", "ANKR", "APE", "API3", "ARB", "ATOM", "AUD", "AVAX", "AXS", "BAL", "BAT", "BIT", "BNB", "BRL", "BTC", "BTT", "BUSD", "CAD", "CAKE", "CELO", "CHF", "CHZ", "CNY", "COMP", "CRO", "CRV", "CVX", "DAI", "DOGE", "DOT", "DYDX", "ETH", "EUL", "EUR", "FIL", "FLOW", "FRAX", "FTM", "FXS", "GBP", "GLMR", "GMX", "GNO", "GRT", "HBAR", "HNT", "HT", "ICP", "IMX", "INR", "JOE", "JPY", "KDA", "KRW", "KSM", "LDO", "LINK", "LQTY", "LTC", "LUSD", "MANA", "MATIC", "METIS", "MIMATIC", "MKR", "MOVR", "MXN", "NEAR", "NZD", "OKB", "OP", "PAXG", "PHP", "QUICK", "ROSE", "RPL", "RSR", "RUNE", "SAND", "SEK", "SGD", "SHIB", "SNX", "SOL", "STETH", "STG", "STMATIC", "STX", "SUSD", "SUSHI", "TRY", "TUSD", "UNI", "USDC", "USDP", "USDT", "WBTC", "XLM", "XMR", "XRP", "XTZ", "YFI", "ZAR", "ZIL", "ZRX"]

const dapiName = ["FRAX"]
console.log(dapiName.length)
const chain = "zkevm";
const name = "FRAX";
const response = await fetch("https://db-api-prod.api3.org/api/dapi-status?" + "chain=" + chain + "&name=" + name + "%2FUSD");
const body = await response.json();
console.log(body);

const proxyAddresses = ["0x6b51F00B762de533CC23d1e0D5F2d2a0F6a33761"]
const proxyAddress = "0x6b51F00B762de533CC23d1e0D5F2d2a0F6a33761";
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_zkevm");
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