import * as fs from "fs";
import { makeContractDeploy, broadcastTransaction, TxBroadcastResultRejected } from "@stacks/transactions";
import { StacksMocknet } from "@stacks/network"

export const network = new StacksMocknet();
network.coreApiUrl = "http://localhost:20443";


export async function deployContract(contractName: string, senderKey: string) {
    const codeBody = fs
        .readFileSync(`./contracts/${contractName}.clar`)
        .toString();
    var transaction = await makeContractDeploy({
        contractName,
        codeBody: codeBody,
        senderKey,
        network,
    });
    console.log(`deploy contract ${contractName}`);
    const result = await broadcastTransaction(transaction, network);
    if ((result as TxBroadcastResultRejected).error)  {
        console.log(result);
    } else {
        await timeout(10000);
    }
}

export function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}