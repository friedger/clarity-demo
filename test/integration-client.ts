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
    makeSTXTokenTransfer,
    standardPrincipalCV,
    PostConditionMode,
    makeStandardNonFungiblePostCondition,
    NonFungibleConditionCode,
    createAssetInfo,
    uintCV,
    makeStandardSTXPostCondition,
    FungibleConditionCode,
    UIntCV,
} from "@stacks/transactions";
import { StacksMocknet } from "@stacks/network";
import { assert } from "chai";
import { deployContract, timeout } from "./utils";

const secretKey =
    "052cc5b8f25b1e44a65329244066f76c8057accd5316c889f476d0ea0329632c01";
const stxAddress = "ST3CECAKJ4BH08JYY7W53MC81BYDT4YDA5M7S5F53";
const network = new StacksMocknet();
network.coreApiUrl = "http://localhost:20443";


describe("pay invoice", () => {
    before(async () => {
        await deployContract("client", secretKey);
    });
    it("pay", async () => {

        const oldBalance = await callReadOnlyFunction({
            contractAddress: stxAddress,
            contractName: "client",
            functionName: "get-balance",
            functionArgs: [],
            senderAddress: stxAddress,
            network
        })

        const tx = await makeContractCall({
            contractAddress: stxAddress,
            contractName: "client",
            functionName: "pay",
            functionArgs: [
                stringAsciiCV("test.id"),
                uintCV(1234),
            ],
            senderKey: secretKey,
            network,
            postConditionMode: PostConditionMode.Deny,
            postConditions: [makeStandardSTXPostCondition(stxAddress,
                FungibleConditionCode.Equal,
                new BN(1234))]
        });
        const result = await broadcastTransaction(tx, network);
        console.log(result);
        await timeout(10000);

        const newBalance = await callReadOnlyFunction({
            contractAddress: stxAddress,
            contractName: "client",
            functionName: "get-balance",
            functionArgs: [],
            senderAddress: stxAddress,
            network
        })
        const newValue = (newBalance as UIntCV).value.toNumber()
        const oldValue = (oldBalance as UIntCV).value.toNumber()
        assert.equal(oldValue - newValue, 1234 + 213)
    });

});
