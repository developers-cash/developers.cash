# Developers.Cash

Developers.Cash is intended to be a service that lists developer resources for Bitcoin Cash.

## Setup/Development

First, install the Quasar Framework CLI tool.

```sh
# Install Quasar CLI (Vue Framework that Developers.Cash uses
npm install -g @quasar/cli

# Clone the repository and install required packages
git clone git@github.com:developers-cash/developers.cash.git
cd developers.cash
npm install
```

Then run with the following command:

```sh
# Run Quasar in Server-Side Rendering mode
quasar dev -m ssr
```

Resources can be added by modifying the `resources.json` file.

**NOTE: There will be a lot of refactoring of this code-base.**
