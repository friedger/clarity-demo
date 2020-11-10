import * as fs from "fs";
import BN from "bn.js";
import {
  broadcastTransaction,
  callReadOnlyFunction,
  cvToHex,
  deserializeCV,
  makeContractCall,
  makeContractDeploy,
  someCV,
  stringAsciiCV,
  tupleCV,
} from "@stacks/transactions";
import { StacksMocknet } from "@stacks/network";
import { assert } from "chai";

const secretKey =
  "b8d99fd45da58038d630d9855d3ca2466e8e0f89d3894c4724f0efc9ff4b51f001";
const stxAddress = "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH";
const network = new StacksMocknet();
network.coreApiUrl = "http://localhost:20443";

export async function deployContract(contractName: string) {
  const codeBody = fs
    .readFileSync(`./contracts/${contractName}.clar`)
    .toString();
  var transaction = await makeContractDeploy({
    contractName,
    codeBody: codeBody,
    senderKey: secretKey,
    network,
  });
  console.log(`deploy contract ${contractName}`);
  const result = await broadcastTransaction(transaction, network);
  console.log(result);
}

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("register name", () => {
  before(async () => {
    await deployContract("dev-registry");
    await timeout(10000);
  });
  it("register", async () => {
    const tx = await makeContractCall({
      contractAddress: stxAddress,
      contractName: "dev-registry",
      functionName: "register",
      functionArgs: [
        stringAsciiCV("test.id"),
        stringAsciiCV("https://claritydevelopers.com"),
      ],
      senderKey: secretKey,
      network,
    });
    const result = await broadcastTransaction(tx, network);
    console.log(result);
    await timeout(10000);
    const response = await fetch(
      network.getReadOnlyFunctionCallApiUrl(
        stxAddress,
        "dev-registry",
        "get-data-by-name?"
      ),
      {
        method: "post",
        headers: { "content-type": "application/json" },
        body: `{ "sender": "${stxAddress}", "arguments": ["${cvToHex(
          stringAsciiCV("test.id")
        )}"] } `,
      }
    );
    const responseBody = await response.json();
    const actual = responseBody.result;
    assert.equal(
      actual,
      cvToHex(
        someCV(
          tupleCV({
            url: stringAsciiCV("https://claritydevelopers.com"),
            name: stringAsciiCV("test.id"),
          })
        )
      )
    );
  });
});
