import {
  Client,
  Provider,
  ProviderRegistry,
  Result,
} from "@blockstack/clarity";
import { assert } from "chai";
import { describe } from "mocha";

describe("dev registry contract test suite", () => {
  let client: Client;
  let provider: Provider;

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    client = new Client(
      "SP3GWX3NE58KXHESRYE4DYQ1S31PQJTCRXB3PE9SB.dev-regsitry",
      "dev-registry",
      provider
    );
  });

  it("should have a valid syntax", async () => {
    await client.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
      await client.deployContract();
    });

    it("should return 'hello world'", async () => {
      const query = client.createQuery({
        method: { name: "say-hi", args: [] },
      });
      const receipt = await client.submitQuery(query);
      const result = Result.unwrapString(receipt);
      assert.equal(result, "hello world");
    });
  });

  after(async () => {
    await provider.close();
  });
});
