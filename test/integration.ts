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
    OptionalCV,
    SomeCV,
    StringAsciiCV,
    TupleCV,
    cvToString,
} from "@stacks/transactions";
import { StacksMocknet } from "@stacks/network";
import { assert } from "chai";
import { deployContract, timeout, network } from "./utils";

const secretKey =
    "b8d99fd45da58038d630d9855d3ca2466e8e0f89d3894c4724f0efc9ff4b51f001";
const stxAddress = "ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH";

describe("register name", () => {
    before(async () => {
        await deployContract("dev-registry", secretKey);
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

        const response = await callReadOnlyFunction({
            contractAddress: stxAddress,
            contractName: "dev-registry",
            functionName: "get-data-by-name?",
            functionArgs: [
                stringAsciiCV("test.id")
            ],
            senderAddress: stxAddress,
            network
        })
        const actual = ((response as SomeCV).value as TupleCV).data
        assert.equal(
            (actual.url as StringAsciiCV).data,
            "https://claritydevelopers.com")
        assert.equal(
            (actual.name as StringAsciiCV).data,
            "test.id")
    });

    it("update", async () => {
        const tx = await makeContractCall({
            contractAddress: stxAddress,
            contractName: "dev-registry",
            functionName: "transfer",
            functionArgs: [
                stringAsciiCV("test.id"),
                standardPrincipalCV("ST26FVX16539KKXZKJN098Q08HRX3XBAP541MFS0P"),
            ],
            senderKey: secretKey,
            network,
            postConditionMode: PostConditionMode.Deny,
            postConditions: [
                makeStandardNonFungiblePostCondition(stxAddress, NonFungibleConditionCode.DoesNotOwn,
                    createAssetInfo(stxAddress, "dev-registry", "developer-nft"),
                    uintCV(1))
            ]
        });
        const txid = await broadcastTransaction(tx, network)
        await timeout(10000)

        const response = await callReadOnlyFunction(
            {
                contractAddress: stxAddress,
                contractName:
                    "dev-registry", functionName:
                    "get-owner?",
                functionArgs: [stringAsciiCV("test.id")],
                network,
                senderAddress: stxAddress
            });
        const actual = (response as SomeCV).value;
        assert.equal(
            cvToString(actual),
            "ST26FVX16539KKXZKJN098Q08HRX3XBAP541MFS0P")

    })
})
