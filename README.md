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
