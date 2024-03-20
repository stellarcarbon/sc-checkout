# Stellarcarbon Checkout

This dedicated checkout UI currently serves as a functional demo, and as a reference implementation showcasing the use of an automatically generated Typescript client for our Stellarcarbon API. It has been used for usability testing and is currently not used in production. Our [new website](https://github.com/stellarcarbon/sc-website) has integrated checkout functionality in its user dashboard.

## Online demo environment

https://offset-gui.surge.sh/

There are three steps in the user flow:
1. connect wallet
1. confirmation, provide name & email (optional)
1. sink carbon

Be aware that this functional demo is connected to our production API. It can be used to sink real carbon. Always check any transactions that you may sign with your wallet, and expect them to be submitted to the public network.

## Developer instructions

### Recommended IDE setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

### Installation

Have recent versions of [Node](https://nodejs.org), [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), and [yarn](https://yarnpkg.com/getting-started/install) installed (globally).

Install local dependencies
```
yarn install
```

### Run scripts

Run local development server
```
yarn run dev
```

Get Svelte diagnostics
```
yarn run check
```

Build a static bundle
```
yarn run build
```

## Generate a Stellarcarbon API client

Stellarcarbon uses an [OpenAPI](https://www.openapis.org/) schema to define its API. Use our [openapi.json](https://api-beta.stellarcarbon.io/openapi.json) to obtain the latest version of the API schema.

We recommend the use of an automatically generated client to interact with our API. In this repository we use a tool that builds a Typescript client. OpenAPI client generators are available for many programming languages and environments.

To generate a TS client with `openapi-typescript-codegen`, run
```
openapi --useOptions --input https://api-beta.stellarcarbon.io/openapi.json --output ./src/client
```

or in this repo, simply do
```
yarn run generate-client
```
