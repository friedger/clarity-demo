[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/friedger/clarity-demo)

# clarity-demo
Companion repo for Clarity Video Series by Harini and Friedger

Use the following command to start mocknet:
```
gitpod /workspace/clarity-demo $ ~/tools/stacks-blockchain/target/release/stacks-node start --config=Stacks.toml
```

## Deploy and test developer registry
call 
```
yarn test -g "register name"
``` 
or 
```
yarn mocha test/integration.ts
```

## Pay invoice
call
```
yarn test -g "pay invoice"
```
or
```
yarn mocha test/integration-client.ts
```

## Video Series
1. [Clarity vs Solidity](https://youtu.be/6lY0j2X2ENw) (11 Sep 2020)  
Quick comparison of the two smart contract languages
1. [Clarity vs Common Smart Contract Security Flaws](https://youtu.be/VYXhrwPsBws) (25 Sep 2020)  
Discussion about [Blockstack's blog post](https://blog.blockstack.org/bringing-clarity-to-8-dangerous-smart-contract-vulnerabilities/).
1. [Build a Clarity program from scratch](https://www.crowdcast.io/e/clarity-program) (16 Oct 2020)  
Using Clarity tools, a registry contract is built using `define-data-var`, `define-map`, `define-public`, `define-private`, `define-read-only`, `map-insert`.  
Links:
   * [Clarity documentation](https://docs.blockstack.org/smart-contracts/overview)
   * [Testnet Explorer](https://testnet-explorer.blockstack.org)
   * [Clarity Tools](https://clarity.tools)
   * [Smart Contracts 101 Video](https://www.youtube.com/watch?v=3EtXnygXk1I)
   * [Clarity Sepcification: SIP-002](https://github.com/blockstack/stacks-blockchain/blob/master/sip/sip-002-smart-contract-language.md)
1. [Deploy to testnet](https://zoom.us/rec/play/X75YdhgspTondQbAr5bU4z8F-wqlw9nS80cJKCVRuPgLBeIYzbjUY0z-fegNNSKrR6eUPXkI1cPqA40F.fEEQWWBC53TZEsob?startTime=1604079090000&_x_zm_rtaid=zGPPmJxrQY2m7jfL7GH4cA.1606376220431.ecc3c96ac83caaa13aaa71f0bc2a14dd&_x_zm_rhtaid=542) (30 Oct 2020)  
Adding a lookup map and an `update` function to the contract using `map-set`; deploying to testnet using Clarity tools as well as Sandbox in testnet explorer. Issues we had:  
   * ~~`strings-ascii` type not supported by Clarity VM~~
   * ~~Clarity Tools using `buf` instead of `buff`~~
   * ~~Only `buff` values can be entered in Testnet Explorer~~    

    Links:
    * [Final contract in Clarity Tools](https://clarity.tools/code?KGRlZmluZS1ub24tZnVuZ2libGUtdG9rZW4gZGV2ZWxvcGVyLW5mdCB1aW50KQoKKGRlZmluZS1tYXAgcmVnaXN0cnkgCiAoCiAgKGlkIHVpbnQpKSAKICggCiAgKG5hbWUgKHN0cmluZy1hc2NpaSAzMCkpIAogICh1cmwgKHN0cmluZy1hc2NpaSAyNTApKSkpCgooZGVmaW5lLW1hcCBsb29rdXAKICgobmFtZSAoc3RyaW5nLWFzY2lpIDMwKSkpCiAoKGlkIHVpbnQpKSkKICAgCihkZWZpbmUtZGF0YS12YXIgbGFzdC1pZCB1aW50IHUwKQoKKGRlZmluZS1wdWJsaWMgKHNheS1oaSkgKG9rICJXZWxjb21lIHRvIENsYXJpdHkgZGVtbyIpKQoKKGRlZmluZS1yZWFkLW9ubHkgKGdldC1sYXN0LWlkKSAodmFyLWdldCBsYXN0LWlkKSkKCihkZWZpbmUtcHJpdmF0ZSAoZ2V0LWlkLWJ5LW5hbWU/IChuYW1lIChzdHJpbmctYXNjaWkgMzApKSkKIChnZXQgaWQgKG1hcC1nZXQ/IGxvb2t1cCB7bmFtZTogbmFtZX0pKSkKCihkZWZpbmUtcmVhZC1vbmx5IChnZXQtZGF0YS1ieS1uYW1lPyAobmFtZSAoc3RyaW5nLWFzY2lpIDMwKSkpCiAobWFwLWdldD8gcmVnaXN0cnkge2lkOiAodW53cmFwISAoZ2V0LWlkLWJ5LW5hbWU/IG5hbWUpIG5vbmUpfSkpCiAKCihkZWZpbmUtcHVibGljIChyZWdpc3RlciAobmFtZSAoc3RyaW5nLWFzY2lpIDMwKSkgKHVybCAoc3RyaW5nLWFzY2lpIDI1MCkpKQogIChsZXQgKChpZCAoKyAoZ2V0LWxhc3QtaWQpIHUxKSkpIAogICAgKGJlZ2luICh2YXItc2V0IGxhc3QtaWQgaWQpIAogICAgICAobWFwLWluc2VydCByZWdpc3RyeSB7aWQ6IGlkfSB7bmFtZTogbmFtZSwgdXJsOiB1cmx9KSAKICAgICAgKG1hcC1pbnNlcnQgbG9va3VwIHtuYW1lOiBuYW1lfSB7aWQ6IGlkfSkKICAgICAgKG9rIGlkKSkpKQoKKGRlZmluZS1wdWJsaWMgKHVwZGF0ZSAobmFtZSAoc3RyaW5nLWFzY2lpIDMwKSkgKHVybCAoc3RyaW5nLWFzY2lpIDI1MCkpKQogIChvayAobWFwLXNldCByZWdpc3RyeSB7aWQ6ICh1bndyYXAhIChnZXQtaWQtYnktbmFtZT8gbmFtZSkgKGVyciAxKSl9IHtuYW1lOiBuYW1lLCB1cmw6IHVybH0pKSkKIAoKKHRlc3Q9IChnZXQtZGF0YS1ieS1uYW1lPyAibm90aGluZy5pZCIpKQoKKHRlc3Q9IChyZWdpc3RlciAidGVzdC5pZCIgImh0dHBzOi8vY2xhcml0eWRldmVsb3BlcnMuY29tIikpCgoodGVzdD0gKHJlZ2lzdGVyICJ0ZXN0Mi5pZCIgImh0dHBzOi8vc3RhY2tzLmRldiIpKQoKKHRlc3Q9IChnZXQtaWQtYnktbmFtZT8gInRlc3QyLmlkIikpCgoodGVzdD0gKHVwZGF0ZSAidGVzdC5pZCIgImh0dHBzOi8vZXhhbXBsZS5jb20iKSAob2sgdHJ1ZSkpCgoodGVzdD0gKGdldC1kYXRhLWJ5LW5hbWU/ICJ0ZXN0LmlkIikp)
    * [Testnet Explorer](https://testnet-explorer.blockstack.org)
1. [Using NFTs on mocknet](https://www.crowdcast.io/e/clarity-demo-part-3/) (13 Nov 2020)  
Still using Clarity Tools, adding NFTs to protect data update function;  
Using Gitpod, running a fast, local blockchain, aka mocknet and testing the `update` function using javascript methods. Issues:  
    * ~~`callReadOnlyFunction` in stacks.js fails to deserialize result~~  

   Links:
   * [Final contract in Clarity Tools](https://clarity.tools/code?KGRlZmluZS1ub24tZnVuZ2libGUtdG9rZW4gZGV2ZWxvcGVyLW5mdCB1aW50KQoKKGRlZmluZS1tYXAgcmVnaXN0cnkgCiAoCiAgKGlkIHVpbnQpKSAKICggCiAgKG5hbWUgKHN0cmluZy1hc2NpaSAzMCkpIAogICh1cmwgKHN0cmluZy1hc2NpaSAyNTApKSkpCgooZGVmaW5lLW1hcCBsb29rdXAKICgobmFtZSAoc3RyaW5nLWFzY2lpIDMwKSkpCiAoKGlkIHVpbnQpKSkKICAgCihkZWZpbmUtZGF0YS12YXIgbGFzdC1pZCB1aW50IHUwKQoKKGRlZmluZS1wdWJsaWMgKHNheS1oaSkgKG9rICJXZWxjb21lIHRvIENsYXJpdHkgZGVtbyIpKQoKKGRlZmluZS1yZWFkLW9ubHkgKGdldC1sYXN0LWlkKSAodmFyLWdldCBsYXN0LWlkKSkKCihkZWZpbmUtcHJpdmF0ZSAoZ2V0LWlkLWJ5LW5hbWU/IChuYW1lIChzdHJpbmctYXNjaWkgMzApKSkKIChnZXQgaWQgKG1hcC1nZXQ/IGxvb2t1cCB7bmFtZTogbmFtZX0pKSkKCihkZWZpbmUtcmVhZC1vbmx5IChnZXQtZGF0YS1ieS1uYW1lPyAobmFtZSAoc3RyaW5nLWFzY2lpIDMwKSkpCiAobWFwLWdldD8gcmVnaXN0cnkge2lkOiAodW53cmFwISAoZ2V0LWlkLWJ5LW5hbWU/IG5hbWUpIG5vbmUpfSkpCiAKCihkZWZpbmUtcHVibGljIChyZWdpc3RlciAobmFtZSAoc3RyaW5nLWFzY2lpIDMwKSkgKHVybCAoc3RyaW5nLWFzY2lpIDI1MCkpKQogIChsZXQgKChpZCAoKyAoZ2V0LWxhc3QtaWQpIHUxKSkpIAogICAgKGJlZ2luICh2YXItc2V0IGxhc3QtaWQgaWQpIAogICAgICAobWFwLWluc2VydCByZWdpc3RyeSB7aWQ6IGlkfSB7bmFtZTogbmFtZSwgdXJsOiB1cmx9KSAKICAgICAgKG1hcC1pbnNlcnQgbG9va3VwIHtuYW1lOiBuYW1lfSB7aWQ6IGlkfSkKICAgICAgKHVud3JhcC1wYW5pYyAobmZ0LW1pbnQ/IGRldmVsb3Blci1uZnQgaWQgdHgtc2VuZGVyKSkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgKG9rIGlkKSkpKQoKKGRlZmluZS1yZWFkLW9ubHkgKGdldC1vd25lcj8gKG5hbWUgKHN0cmluZy1hc2NpaSAzMCkpKQogKG5mdC1nZXQtb3duZXI/IGRldmVsb3Blci1uZnQgKHVud3JhcCEgKGdldC1pZC1ieS1uYW1lPyBuYW1lKSBub25lKSkpCgooZGVmaW5lLXB1YmxpYyAodXBkYXRlIChuYW1lIChzdHJpbmctYXNjaWkgMzApKSAodXJsIChzdHJpbmctYXNjaWkgMjUwKSkpCiAgKGlmIChpcy1lcSB0eC1zZW5kZXIgKHVud3JhcC1wYW5pYyAoZ2V0LW93bmVyPyBuYW1lKSkpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAob2sgKG1hcC1zZXQgcmVnaXN0cnkge2lkOiAodW53cmFwISAoZ2V0LWlkLWJ5LW5hbWU/IG5hbWUpIChlcnIgdTEpKX0ge25hbWU6IG5hbWUsIHVybDogdXJsfSkpCiAgICAoZXJyIHUyKSkpCgooZGVmaW5lLXB1YmxpYyAodHJhbnNmZXIgKG5hbWUgKHN0cmluZy1hc2NpaSAzMCkpIChyZWNpcGllbnQgcHJpbmNpcGFsKSkKICAoaWYgKGlzLWVxIHR4LXNlbmRlciAodW53cmFwLXBhbmljIChnZXQtb3duZXI/IG5hbWUpKSkKICAgIChuZnQtdHJhbnNmZXI/IGRldmVsb3Blci1uZnQgKHVud3JhcCEgKGdldC1pZC1ieS1uYW1lPyBuYW1lKSAoZXJyIHUxKSkgdHgtc2VuZGVyIHJlY2lwaWVudCkgICAgICAKICAgIChlcnIgdTIpKSkKICAKCiAKIAogICAgCiAgIAogCgoodGVzdD0gKGdldC1kYXRhLWJ5LW5hbWU/ICJub3RoaW5nLmlkIikpCgoodGVzdD0gKHJlZ2lzdGVyICJ0ZXN0LmlkIiAiaHR0cHM6Ly9jbGFyaXR5ZGV2ZWxvcGVycy5jb20iKSkKCih0ZXN0PSAocmVnaXN0ZXIgInRlc3QyLmlkIiAiaHR0cHM6Ly9zdGFja3MuZGV2IikpCgoodGVzdD0gKGdldC1pZC1ieS1uYW1lPyAidGVzdDIuaWQiKSkKCih0ZXN0PSAodXBkYXRlICJ0ZXN0LmlkIiAiaHR0cHM6Ly9leGFtcGxlLmNvbSIpIChvayB0cnVlKSkKKHRlc3Q9IChnZXQtb3duZXI/ICJ0ZXN0LmlkIikpCgoodGVzdD0gKHRyYW5zZmVyICJ0ZXN0LmlkIiAnU1QxMkVZOTlHUzRZS1AwQ1AyQ0ZXNlNFUFdRMkNHVlJXSzVHSEtEUlYpKQoodGVzdD0gKGdldC1vd25lcj8gInRlc3QuaWQiKSkKKHRlc3Q9ICh1cGRhdGUgInRlc3QuaWQiICJodHRwczovL2V4YW1wbGUuY29tIikgKGVyciB1Mikp)
   * [Running mocknet using docker](https://docs.blockstack.org/stacks-blockchain/local-development)
   * [NFT resources](https://www.tofauti.net/)
1. [Pay an invoice](https://www.crowdcast.io/e/clarity-demo-part-4) (24 Nov 2020)  
Using Gitpod, adding a client contract using `contract-call?`, `stx-transfer`, `stx-get-balance`. Issues:
    * ~~duplicate calls of register test file in mocha test~~  
    
    Links:
    * [Documentation of `contract-call?`](https://docs.blockstack.org/references/language-overview#contract-calls)